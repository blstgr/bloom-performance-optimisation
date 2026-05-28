import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { AppText } from './AppText';

const meta = {
  title: 'UI/AppText',
  component: AppText,
  args: {
    children: 'Plant Situation',
  },
} satisfies Meta<typeof AppText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <View style={styles.stack}>
      <AppText variant="hero">Plant Situation</AppText>
      <AppText variant="headline">Keep something alive</AppText>
      <AppText variant="title">ZZ plant</AppText>
      <AppText variant="sectionTitle">Watering schedule</AppText>
      <AppText variant="body">Likes bright indirect light and mild neglect.</AppText>
      <AppText variant="caption">15 May</AppText>
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.md,
    width: 320,
  },
});
