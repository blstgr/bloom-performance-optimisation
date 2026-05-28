import React from 'react';
import { StyleSheet, View } from 'react-native';

import { spacing } from '../../../theme';
import { PhotoGridItem } from './PhotoGridItem';
import { type PhotoGridImage } from './types';

export type PhotoRowProps = {
  image: PhotoGridImage;
};

export function PhotoRow({ image }: PhotoRowProps) {
  return (
    <View style={styles.row}>
      <PhotoGridItem source={{ uri: image.uri }} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xxs,
    width: '100%',
  },
});
