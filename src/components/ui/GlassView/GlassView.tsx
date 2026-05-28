import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radii, shadows } from '../../../theme';

export type GlassViewProps = {
  children?: React.ReactNode;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

export function GlassView({ children, radius = radii.pill, style }: GlassViewProps) {
  return (
    <View style={[styles.container, { borderRadius: radius }, style]}>
      <BlurView
        blurAmount={8}
        blurType="light"
        reducedTransparencyFallbackColor={colors.surface.glassLight}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.tint} />
      <View style={styles.highlight} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.glassLight,
    borderColor: colors.border.white,
    borderWidth: 1,
    overflow: 'hidden',
    ...shadows.soft,
  },
  tint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface.glassLight,
  },
  highlight: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface.glassSubtle,
    borderColor: colors.border.glass,
    borderWidth: 1,
  },
});
