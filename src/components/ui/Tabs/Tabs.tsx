import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, type LayoutChangeEvent } from 'react-native';
import Reanimated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors, durations, fontFamilies, radii, spacing } from '../../../theme';
import { AppText } from '../AppText';
import { GLASS_BUTTON_ACTIVE_OPACITY } from '../Button';
import { useSlidingIndicator } from '../SlidingIndicator';

// Vertical padding + the body variant's line height (typography.body.lineHeight, 26) sum to the
// Figma spec's 32px badge height, rather than a separately hardcoded height.
const TAB_VERTICAL_PADDING = 3;
const TAB_RESTING_SCALE = 1;
const TAB_PRESSED_SCALE = 0.94;
const ACTIVE = 1;
const INACTIVE = 0;
const PRESSED = 1;
const RELEASED = 0;

const ReanimatedAppText = Reanimated.createAnimatedComponent(AppText);

export type TabItem<Key extends string = string> = {
  key: Key;
  label: string;
};

export type TabsProps<Key extends string = string> = {
  // `NoInfer` keeps `tabs` as the only source of `Key`. Without it, passing an `activeKey` that
  // isn't one of the tab keys just widens `Key` to include it instead of failing to compile —
  // which silently yields a tab bar with nothing selected.
  activeKey: NoInfer<Key>;
  onTabPress: (key: NoInfer<Key>) => void;
  tabs: TabItem<Key>[];
};

type TabButtonProps<Key extends string> = {
  isActive: boolean;
  label: string;
  onLayout: (key: Key, event: LayoutChangeEvent) => void;
  onTabPress: (key: Key) => void;
  tabKey: Key;
};

/** One tab. Split out of `Tabs` because each tab owns its own shared values, and hooks can't be
 * called from inside the `tabs.map()` loop. */
function TabButton<Key extends string>({
  isActive,
  label,
  onLayout,
  onTabPress,
  tabKey,
}: TabButtonProps<Key>) {
  const activeProgress = useSharedValue(isActive ? ACTIVE : INACTIVE);
  const pressProgress = useSharedValue(RELEASED);

  React.useEffect(() => {
    activeProgress.value = withTiming(isActive ? ACTIVE : INACTIVE, {
      duration: durations.indicatorCrossFadeMs,
    });
  }, [activeProgress, isActive]);

  const pressStyle = useAnimatedStyle(() => ({
    // Clamped because `withSpring` overshoots both ends by default: unclamped, the tab would dip
    // past TAB_PRESSED_SCALE on press and settle larger than its resting size on release.
    transform: [
      {
        scale: interpolate(
          pressProgress.value,
          [RELEASED, PRESSED],
          [TAB_RESTING_SCALE, TAB_PRESSED_SCALE],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  // The chip's own white surface fades out as it becomes active, letting the shared dark pill
  // behind the row show through. Fading the surface rather than drawing the pill on top is what
  // lets the pill travel without covering the labels of the chips it passes over — the trick the
  // reference implementation uses a clip-path for, which React Native has no equivalent of.
  const surfaceStyle = useAnimatedStyle(() => ({ opacity: 1 - activeProgress.value }));

  // `text.inverse` and `surface.white` are both #FFFFFF, so a one-frame colour flip would leave
  // the newly selected chip white-on-white — and the deselected one dark-on-dark — while the
  // pill is still travelling. Cross-fading on the same curve avoids both.
  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      activeProgress.value,
      [INACTIVE, ACTIVE],
      [colors.text.primary, colors.text.inverse],
    ),
  }));

  const handleLayout = React.useCallback(
    (event: LayoutChangeEvent) => onLayout(tabKey, event),
    [onLayout, tabKey],
  );
  const handlePress = React.useCallback(() => onTabPress(tabKey), [onTabPress, tabKey]);
  const handlePressIn = React.useCallback(() => {
    pressProgress.value = withSpring(PRESSED);
  }, [pressProgress]);
  const handlePressOut = React.useCallback(() => {
    pressProgress.value = withSpring(RELEASED);
  }, [pressProgress]);

  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      activeOpacity={GLASS_BUTTON_ACTIVE_OPACITY}
      onLayout={handleLayout}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Reanimated.View style={[styles.tab, pressStyle]}>
        <Reanimated.View pointerEvents="none" style={[styles.tabSurface, surfaceStyle]} />
        <ReanimatedAppText style={[styles.tabLabel, labelStyle]} variant="body">
          {label}
        </ReanimatedAppText>
      </Reanimated.View>
    </TouchableOpacity>
  );
}

export function Tabs<Key extends string = string>({ activeKey, onTabPress, tabs }: TabsProps<Key>) {
  const { indicatorStyle, onItemLayout } = useSlidingIndicator(activeKey);

  return (
    <ScrollView
      accessibilityRole="tablist"
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      {/*
        * Lives inside the scroll content rather than beside it, so it travels with the chips when
        * the row scrolls and needs no scroll-offset correction. Rendered first to sit underneath:
        * React Native paints siblings in document order.
        */}
      <Reanimated.View pointerEvents="none" style={[styles.indicator, indicatorStyle]} />
      {tabs.map(tab => (
        <TabButton
          key={tab.key}
          isActive={tab.key === activeKey}
          label={tab.label}
          onLayout={onItemLayout}
          onTabPress={onTabPress}
          tabKey={tab.key}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  indicator: {
    backgroundColor: colors.surface.dark,
    borderRadius: radii.pill,
    bottom: 0,
    left: 0,
    position: 'absolute',
    top: 0,
  },
  scroll: {
    flexGrow: 0,
  },
  tab: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: TAB_VERTICAL_PADDING,
  },
  // Figma specs Satoshi Black for this label; only Satoshi-Medium and Satoshi-Bold are bundled in
  // this project, so Bold is the closest available match — kept as a style override rather than a
  // new AppText variant since no other text in the app uses this size/weight combination.
  tabLabel: {
    fontFamily: fontFamilies.bodyBold,
  },
  tabSurface: {
    backgroundColor: colors.surface.white,
    borderRadius: radii.pill,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
