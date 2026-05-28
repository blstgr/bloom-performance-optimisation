import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../../theme';

export type LoaderProps = {
  overlay?: boolean;
};

export function Loader({ overlay = false }: LoaderProps) {
  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      <ActivityIndicator color={colors.icon.inverse} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  overlay: {
    backgroundColor: 'rgba(46, 43, 40, 0.18)',
    borderRadius: radii.pill,
  },
});
