import type { Meta, StoryObj } from '@storybook/react-native';

import { CameraControls } from './CameraControls';

const meta = {
  title: 'Camera/CameraControls',
  component: CameraControls,
} satisfies Meta<typeof CameraControls>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Capture: Story = {};

export const Confirm: Story = {
  args: {
    mode: 'confirm',
  },
};
