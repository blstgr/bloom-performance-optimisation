import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomActions } from '../components/ui/BottomActions';

import { SCREENS } from './constants';
import { MainTabBar } from './MainTabBar';
import type { TabParamList } from './types';
import { useTabScreenNavigation } from './useTabScreenNavigation';

const TAB_SCREENS: readonly (keyof TabParamList)[] = [
  SCREENS.HOME,
  SCREENS.LIBRARY,
  SCREENS.WATER,
  SCREENS.FAVORITES,
];

function isTabScreen(routeName: string): routeName is keyof TabParamList {
  return (TAB_SCREENS as readonly string[]).includes(routeName);
}

/**
 * The single, navigator-owned tab bar.
 *
 * Previously every tab screen rendered its own `MainTabBar` inside its `ScreenLayout` overlay, so
 * that the frosted bar sat in the screen's own tree and content scrolled behind it. That gave
 * four mounted bars, each with a constant active key — which is why the bar could never show a
 * pill travelling between items. Rendering once here restores the ability to animate, and each
 * screen instead asks `ScreenLayout` to reserve the same bottom inset via `reserveBottomBarSpace`.
 *
 * The glass still has to composite over screen content, so this is positioned absolutely over the
 * screen container rather than taking a row in the navigator's column. `box-none` keeps taps on
 * the empty area either side of the pill falling through to the screen underneath.
 *
 * Positioning deliberately mirrors what `ScreenLayout` did for the overlay — absolute, full
 * width, offset by the bottom safe-area inset, wrapping `BottomActions` — so the bar lands in
 * exactly the same place as before rather than in a re-derived approximation of it.
 */
export function FloatingTabBar({ navigation, state }: BottomTabBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const { navigateTab, openAddPlant } = useTabScreenNavigation(navigation);
  // Checked rather than asserted. `BottomTabBarProps` is typed over `ParamListBase`, so nothing
  // ties this component to the navigator that owns `TabParamList`; a bare cast would silently
  // produce a bar with nothing highlighted if a route outside the tab list ever appeared.
  const activeRouteName = state.routes[state.index].name;
  const activeScreen = isTabScreen(activeRouteName) ? activeRouteName : undefined;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.overlay, { bottom: safeAreaInsets.bottom }]}>
      <BottomActions
        bottomBar={(
          <MainTabBar
            activeScreen={activeScreen}
            onAddPlant={openAddPlant}
            onNavigate={navigateTab}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
