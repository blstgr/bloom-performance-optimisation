import React from 'react';
import { StyleSheet, useWindowDimensions, View, type ViewStyle } from 'react-native';

import { spacing } from '../../../theme';
import { PhotoGridItem } from './PhotoGridItem';
import { type PhotoGridImage } from './types';

export type PhotoGridProps = {
  columns?: number;
  images: PhotoGridImage[];
  itemAspectRatio?: number;
  maxWidth?: number;
  style?: ViewStyle;
};

export function PhotoGrid({
  columns = 3,
  images,
  itemAspectRatio = 1,
  maxWidth = 361,
  style,
}: PhotoGridProps) {
  const { width } = useWindowDimensions();
  const gridWidth = Math.min(width - spacing.md * 2, maxWidth);
  const itemWidth = (gridWidth - spacing.xxs * (columns - 1)) / columns;

  return (
    <View style={[styles.grid, { width: gridWidth }, style]}>
      {images.map(image => (
        <PhotoGridItem
          key={image.id}
          source={{ uri: image.uri }}
          style={{
            aspectRatio: itemAspectRatio,
            width: itemWidth,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xxs,
  },
});
