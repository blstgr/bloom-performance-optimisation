import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii, shadows, sizes } from '../../../theme';
import { IconButton } from '../../ui/IconButton';

export type CameraControlsMode = 'capture' | 'confirm';

export type CameraControlsProps = {
  mode?: CameraControlsMode;
  onCapturePress?: () => void;
  onConfirmPress?: () => void;
  onRetakePress?: () => void;
};

export function CameraControls({
  mode = 'capture',
  onCapturePress,
  onConfirmPress,
  onRetakePress,
}: CameraControlsProps) {
  if (mode === 'confirm') {
    return (
      <View style={styles.confirmBar}>
        <IconButton icon="camera" onPress={onRetakePress} />
        <IconButton icon="check" onPress={onConfirmPress} size="md" variant="primary" />
      </View>
    );
  }

  return (
    <View style={styles.captureBar}>
      <IconButton icon="camera" onPress={onCapturePress} size="md" variant="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  captureBar: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.white,
    borderRadius: radii.pill,
    borderWidth: 1,
    justifyContent: 'center',
    ...shadows.soft,
  },
  confirmBar: {
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.white,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    ...shadows.soft,
  },
  shutter: {
    height: sizes.icon.shutter,
    width: sizes.icon.shutter,
  },
});
