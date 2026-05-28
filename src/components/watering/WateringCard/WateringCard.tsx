import React from 'react';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { colors, radii, spacing } from '../../../theme';
import { Badge } from '../../ui/Badge';
import { Icon } from '../../ui/Icon';

export type WateringCardState = 'due' | 'pulled' | 'completed';

export type WateringCardProps = {
  day: string;
  imageUrl: string;
  month: string;
  onPress?: () => void;
  state?: WateringCardState;
};

export function WateringCard({
  day,
  imageUrl,
  month,
  onPress,
  state = 'due',
}: WateringCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - spacing.md * 2, 361);
  const imageOffset = state === 'due' ? 0 : state === 'pulled' ? -60 : -140;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, { width: cardWidth }]}>
      {state !== 'due' ? (
        <View style={styles.reveal}>
          <Icon
            name={state === 'completed' ? 'check' : 'water'}
            color={colors.icon.inverse}
          />
        </View>
      ) : null}
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.image,
          {
            transform: [{ translateX: imageOffset }],
            width: cardWidth,
          },
        ]}
      />
      <Badge variant="date" day={day} month={month} style={styles.badge} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  card: {
    backgroundColor: colors.brand.green,
    borderRadius: radii.photo,
    height: 130,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: colors.surface.plantPlaceholder,
    borderRadius: radii.photo,
    height: 130,
    position: 'absolute',
  },
  reveal: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    paddingRight: spacing.xl,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
});
