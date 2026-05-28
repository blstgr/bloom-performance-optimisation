import type { Preview } from '@storybook/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../src/theme';

const preview: Preview = {
  decorators: [
    Story => (
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.screen}>
          <View style={styles.canvas}>
            <Story />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

const styles = StyleSheet.create({
  canvas: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    width: '100%',
  },
  screen: {
    backgroundColor: colors.background.warm,
    flex: 1,
  },
});

export default preview;
