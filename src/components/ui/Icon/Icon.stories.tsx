import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { AppText } from '../AppText';
import { Icon, type IconName } from './Icon';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  args: {
    name: 'home',
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

const names: IconName[] = [
  'home',
  'plus',
  'water',
  'more',
  'close',
  'flashOff',
  'camera',
  'check',
  'trash',
  'plant',
  'drop',
  'schedule',
  'google',
];

export const All: Story = {
  render: () => (
    <View style={styles.grid}>
      {names.map(name => (
        <View key={name} style={styles.item}>
          <Icon name={name} />
          <AppText variant="caption">{name}</AppText>
        </View>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    width: 320,
  },
  item: {
    alignItems: 'center',
    gap: spacing.xs,
    width: 72,
  },
});
