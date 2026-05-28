import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';

import { colors, radii, shadows, sizes, spacing } from '../../../theme';
import { GlassView } from '../../ui/GlassView';
import { Icon } from '../../ui/Icon';

export type WateringSliderState = 'idle' | 'pulled' | 'completed';

export type WateringSliderProps = {
  onPress?: () => void;
  state?: WateringSliderState;
};

export function WateringSlider({ onPress, state = 'idle' }: WateringSliderProps) {
  const { width } = useWindowDimensions();
  const sliderWidth = Math.min(width - spacing.xxl * 2, 329);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityState={{ checked: state === 'completed' }}
      onPress={onPress}
      style={[
        styles.track,
        { width: sliderWidth },
        state === 'completed' && styles.completedTrack,
      ]}>
      {state !== 'completed' ? <GlassView style={styles.blurLayer} /> : null}
      <View
        style={[
          styles.thumb,
          state === 'pulled' && styles.pulledThumb,
          state === 'completed' && styles.completedThumb,
        ]}>
        <Icon name="water" color={colors.icon.inverse} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  blurLayer: {
    ...StyleSheet.absoluteFill,
  },
  completedThumb: {
    backgroundColor: colors.brand.green,
    width: '100%',
  },
  completedTrack: {
    backgroundColor: colors.brand.green,
  },
  pulledThumb: {
    width: 116,
  },
  thumb: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.action.primary,
    borderRadius: radii.pill,
    height: sizes.button.normal,
    justifyContent: 'center',
    width: sizes.button.normal,
  },
  track: {
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.white,
    borderRadius: radii.pill,
    borderWidth: 1,
    height: sizes.button.normal,
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadows.soft,
  },
});
