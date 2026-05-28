import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { WateringCard } from './WateringCard';

const meta = {
  title: 'Watering/WateringCard',
  component: WateringCard,
  args: {
    day: '15',
    month: 'May',
    imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?w=900',
  },
} satisfies Meta<typeof WateringCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Due: Story = {};

export const Pulled: Story = {
  args: {
    state: 'pulled',
  },
};

export const Completed: Story = {
  args: {
    state: 'completed',
  },
};

export const List: Story = {
  render: args => (
    <View style={styles.stack}>
      <WateringCard {...args} />
      <WateringCard {...args} state="pulled" />
      <WateringCard {...args} day="16" state="completed" />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.xxs,
  },
});
