import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, radii, sizes } from '../../../theme';
import { Badge } from '../Badge';
import { Icon, type IconName } from '../Icon';

export type NavBarItemProps = {
  active?: boolean;
  badgeCount?: number;
  icon: IconName;
  onPress?: () => void;
};

export function NavBarItem({ active = false, badgeCount, icon, onPress }: NavBarItemProps) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.78}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        onPress={onPress}
        style={[styles.item, active && styles.active]}>
        <Icon name={icon} color={active ? colors.icon.inverse : colors.icon.primary} />
      </TouchableOpacity>
      {badgeCount ? (
        <Badge variant="count" label={`${badgeCount}`} style={styles.badge} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.action.primary,
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: 0,
  },
  item: {
    alignItems: 'center',
    borderRadius: radii.pill,
    height: sizes.nav.item,
    justifyContent: 'center',
    width: sizes.nav.item,
  },
});
