import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../../theme';
import { Button } from '../../Button';
import { AppText } from '../../ui/AppText';

export type SettingsRowProps = {
  actionLabel: string;
  label: string;
  onActionPress?: () => void;
  value: string;
};

export function SettingsRow({
  actionLabel,
  label,
  onActionPress,
  value,
}: SettingsRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <AppText variant="sectionTitle">{label}</AppText>
        <AppText>{value}</AppText>
      </View>
      <Button label={actionLabel} onPress={onActionPress} size="small" />
    </View>
  );
}

const styles = StyleSheet.create({
  copy: {
    gap: spacing.xs,
  },
  row: {
    alignItems: 'flex-start',
    backgroundColor: colors.surface.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.xxl,
  },
});
