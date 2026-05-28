import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, spacing } from '../../../theme';
import { Button } from '../../Button';
import { SettingsRow, type SettingsRowProps } from './SettingsRow';

export type SettingsPanelProps = {
  rows: SettingsRowProps[];
  onLogoutPress?: () => void;
};

export function SettingsPanel({ onLogoutPress, rows }: SettingsPanelProps) {
  return (
    <View style={styles.panel}>
      {rows.map(row => (
        <SettingsRow key={row.label} {...row} />
      ))}
      <View style={styles.logout}>
        <Button label="Log out" onPress={onLogoutPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: colors.surface.white,
    padding: spacing.xxl,
  },
  panel: {
    borderRadius: radii.photo,
    overflow: 'hidden',
    width: '100%',
  },
});
