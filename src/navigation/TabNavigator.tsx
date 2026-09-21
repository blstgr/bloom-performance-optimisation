import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { WaterScreen } from '../screens/WaterScreen';

import { SCREENS } from './constants';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * The navigator deliberately draws no tab bar of its own: each tab screen renders `MainTabBar`
 * itself, inside its `ScreenLayout` bottom-actions overlay.
 *
 * Why: the bar is frosted glass and content has to scroll *behind* it, so it needs to sit in the
 * screen's own absolutely-positioned overlay. A navigator-level `tabBar` renders outside the
 * screen, which is a different place in the view hierarchy for the blur to sample from.
 *
 * Accepted consequence: a new tab screen must render `MainTabBar` itself and pass the same props
 * (`activeScreen`, `onAddPlant`, `onNavigate`). That repetition is the price of the glass overlay,
 * not an oversight — and it is why the bar has no shared sliding indicator: four bars are mounted
 * at once (see `detachInactiveScreens` above), each with a constant active key.
 */
function renderNoTabBar() {
  return null;
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      // react-native-screens detaching/freezing inactive tabs races with focusing a TextInput
      // on the active one (a keyboard session opens then immediately closes) — see
      // https://github.com/software-mansion/react-native-screens/issues/1342
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderNoTabBar}>
      <Tab.Screen component={HomeScreen} name={SCREENS.HOME} />
      <Tab.Screen component={LibraryScreen} name={SCREENS.LIBRARY} />
      <Tab.Screen component={WaterScreen} name={SCREENS.WATER} />
      <Tab.Screen component={FavoritesScreen} name={SCREENS.FAVORITES} />
    </Tab.Navigator>
  );
}
