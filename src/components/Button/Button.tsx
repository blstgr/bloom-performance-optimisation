import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, radii, shadows, sizes, spacing } from '../../theme';
import { AppText } from '../ui/AppText';
import { GlassView } from '../ui/GlassView';
import { Icon, type IconName } from '../ui/Icon';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'normal';

export type ButtonProps = TouchableOpacityProps & {
  icon?: IconName;
  label?: string;
  loading?: boolean;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
};

export function Button({
  disabled,
  icon,
  label,
  loading = false,
  size = 'normal',
  style,
  variant = 'primary',
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const foreground = variant === 'primary' ? colors.text.inverse : colors.text.primary;
  const hasLabel = Boolean(label);
  const iconOnly = !hasLabel && Boolean(icon);
  const loaderOnly = !hasLabel && loading;
  const compact = iconOnly || loaderOnly;

  return (
    <TouchableOpacity
      activeOpacity={0.78}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[size],
        compact && styles.compact,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      {...pressableProps}>
      {variant === 'secondary' ? <GlassView style={styles.blurLayer} /> : null}
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <>
          {icon ? <Icon name={icon} color={foreground} size={24} /> : null}
          {hasLabel ? (
            <AppText variant="button" tone={variant === 'primary' ? 'inverse' : 'primary'}>
              {label}
            </AppText>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing.md,
    ...shadows.soft,
  },
  blurLayer: {
    ...StyleSheet.absoluteFill,
  },
  disabled: {
    opacity: 0.48,
  },
  compact: {
    paddingHorizontal: spacing.none,
  },
  normal: {
    minHeight: sizes.button.normal,
    minWidth: sizes.button.normal,
  },
  primary: {
    backgroundColor: colors.action.primary,
    borderColor: colors.border.white,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.border.white,
  },
  small: {
    minHeight: sizes.button.small,
    minWidth: sizes.button.small,
  },
});
