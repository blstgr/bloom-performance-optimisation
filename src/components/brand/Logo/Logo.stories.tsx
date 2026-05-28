import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { Logo, LogoSymbol } from './Logo';

const meta = {
  title: 'Brand/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
  render: () => (
    <View style={styles.preview}>
      <Logo />
    </View>
  ),
};

export const Symbol: Story = {
  render: () => (
    <View style={styles.preview}>
      <LogoSymbol />
    </View>
  ),
};

const styles = StyleSheet.create({
  preview: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    padding: spacing.xl,
    width: 320,
  },
});
