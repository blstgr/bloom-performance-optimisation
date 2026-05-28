import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radii, sizes, spacing } from '../../../theme';
import { AppText } from '../AppText';
import { Icon, type IconName } from '../Icon';

export type BadgeVariant = 'count' | 'date' | 'icon';

export type BadgeProps = {
  day?: string;
  icon?: IconName;
  label?: string;
  month?: string;
  style?: ViewStyle;
  variant?: BadgeVariant;
};

export function Badge({
  day,
  icon,
  label,
  month,
  style,
  variant = 'icon',
}: BadgeProps) {
  if (variant === 'date') {
    return (
      <View style={[styles.date, style]}>
        <View style={styles.dateIcon}>
          <Icon name={icon ?? 'water'} size={16} />
        </View>
        <AppText align="center" variant="caption" tone="inverse">
          {day}
        </AppText>
        <AppText align="center" variant="caption" tone="inverse">
          {month}
        </AppText>
      </View>
    );
  }

  if (variant === 'count') {
    return (
      <View style={[styles.count, style]}>
        <AppText variant="caption" tone="inverse">
          {label}
        </AppText>
      </View>
    );
  }

  return (
    <View style={[styles.icon, style]}>
      <Icon name={icon ?? 'water'} size={16} />
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    alignItems: 'center',
    backgroundColor: colors.brand.orange,
    borderRadius: radii.pill,
    height: sizes.nav.badge,
    justifyContent: 'center',
    width: sizes.nav.badge,
  },
  date: {
    alignItems: 'center',
    backgroundColor: colors.surface.dark,
    borderRadius: radii.pill,
    gap: spacing.xxs,
    padding: spacing.xs,
  },
  dateIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface.white,
    borderRadius: radii.pill,
    height: sizes.badge.md,
    justifyContent: 'center',
    width: sizes.badge.md,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.surface.white,
    borderRadius: radii.pill,
    height: sizes.badge.md,
    justifyContent: 'center',
    width: sizes.badge.md,
  },
});
