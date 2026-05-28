import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { IconButton } from './IconButton';

const meta = {
  title: 'UI/IconButton',
  component: IconButton,
  args: {
    icon: 'more',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SecondarySmall: Story = {};

export const Variants: Story = {
  render: () => (
    <View style={styles.row}>
      <IconButton icon="close" />
      <IconButton icon="more" variant="glass" />
      <IconButton icon="water" variant="primary" size="md" />
      <IconButton icon="trash" />
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
