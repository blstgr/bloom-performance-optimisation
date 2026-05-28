import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';

import { colors, layout, spacing } from '../../../theme';
import { AppText } from '../../ui/AppText';

export type PlantDetailProps = {
  description: string;
  imageUrl: string;
  name: string;
  personality: string;
};

export function PlantDetail({
  description,
  imageUrl,
  name,
  personality,
}: PlantDetailProps) {
  const { width, height } = useWindowDimensions();
  const imageHeight = Math.min(height * 0.38, 326);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={[styles.image, { width, height: imageHeight }]} />
      <View style={styles.content}>
        <View style={styles.titleStack}>
          <AppText variant="hero">{name}</AppText>
          <AppText tone="secondary">{personality}</AppText>
        </View>
        <AppText>{description}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.warm,
    width: '100%',
  },
  content: {
    gap: spacing.md,
    paddingHorizontal: layout.screenPadding,
    paddingVertical: spacing.xxl,
  },
  image: {
    backgroundColor: colors.surface.plantPlaceholder,
  },
  titleStack: {
    gap: spacing.xxs,
  },
});
