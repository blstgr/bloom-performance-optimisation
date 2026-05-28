import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import { radii } from '../../../theme';
import { GlassView } from '../GlassView';
import { type IconName } from '../Icon';
import { NavBarItem } from './NavBarItem';

export type NavItem = {
  badgeCount?: number;
  icon: IconName;
  key: string;
  onPress?: () => void;
};

export type NavBarProps = {
  activeKey?: string;
  items: NavItem[];
  style?: ViewStyle;
};

export function NavBar({ activeKey, items, style }: NavBarProps) {
  return (
    <GlassView style={[styles.nav, style]}>
      {items.map(item => (
        <NavBarItem
          key={item.key}
          active={item.key === activeKey}
          badgeCount={item.badgeCount}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </GlassView>
  );
}

const styles = StyleSheet.create({
  nav: {
    alignItems: 'center',
    borderRadius: radii.pill,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
