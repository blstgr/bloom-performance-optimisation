import React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { springs } from '../../../theme';

type ItemLayout = {
  width: number;
  x: number;
};

/**
 * Drives a single pill that glides between the items of a bar, instead of every item fading its
 * own background independently. One pill moving reads as one object; N cross-fades do not.
 *
 * Positioning comes entirely from measured layout, so nothing assumes a fixed item size or a
 * stable set of items — the favorites filter only renders chips matching something favorited,
 * and re-measurement handles that without special-casing.
 *
 * Requires the bar to be a single live instance, because the pill's position is per-instance
 * state — several mounted copies would each hold their own stationary pill and none would appear
 * to travel. Both callers satisfy that: the favorites chips are one component, and the tab bar
 * is rendered once by the navigator (see `docs/nav-spec.md`, "Tab bar ownership"). Rendering a
 * second live `MainTabBar` would break this.
 */
export function useSlidingIndicator(activeKey: string | undefined, itemKeys: string[]) {
  const layouts = React.useRef<Record<string, ItemLayout>>({});
  // Whether the pill has been positioned yet. The first placement jumps; later ones spring —
  // otherwise the pill would fly in from x=0 every time the bar mounts.
  const hasPlaced = React.useRef(false);
  const x = useSharedValue(0);
  // Zero until the first measurement, which keeps the pill invisible rather than flashing a
  // full-width block for one frame.
  const width = useSharedValue(0);
  const reduceMotion = useReducedMotion();

  const applyActive = React.useCallback(() => {
    if (activeKey == null) return;

    const target = layouts.current[activeKey];
    // Not measured yet; the matching onItemLayout will call back in.
    if (!target) return;

    if (hasPlaced.current && !reduceMotion) {
      x.value = withSpring(target.x, springs.slidingIndicator);
      width.value = withSpring(target.width, springs.slidingIndicator);
    } else {
      x.value = target.x;
      width.value = target.width;
    }

    hasPlaced.current = true;
  }, [activeKey, reduceMotion, width, x]);

  const onItemLayout = React.useCallback(
    (key: string, event: LayoutChangeEvent) => {
      const { width: itemWidth, x: itemX } = event.nativeEvent.layout;
      layouts.current[key] = { width: itemWidth, x: itemX };
      if (key === activeKey) applyActive();
    },
    [activeKey, applyActive],
  );

  React.useEffect(() => {
    applyActive();
  }, [applyActive]);

  // Drop geometry for items that no longer exist. `MainTabBar` adds and removes its Favorites
  // item at runtime, and the item to its right then occupies exactly the slot it vacated — so a
  // stale rect does not merely go unused, it points at a *different* item. Better to have no
  // measurement (the pill holds position) than a confidently wrong one.
  const liveKeySignature = itemKeys.join('\u0000');

  React.useEffect(() => {
    const liveKeys = new Set(liveKeySignature.split('\u0000'));

    for (const key of Object.keys(layouts.current)) {
      if (!liveKeys.has(key)) delete layouts.current[key];
    }
  }, [liveKeySignature]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
    width: width.value,
  }));

  // `x`/`width` are returned as well as the style so an item can react to where the pill actually
  // is, not just to its own active flag. A dark pill passing beneath a dark icon washes it out,
  // and an item mid-travel never changes `active`, so its own flag cannot tell it to invert.
  return { indicatorStyle, indicatorWidth: width, indicatorX: x, onItemLayout };
}
