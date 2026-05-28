import type { Meta, StoryObj } from '@storybook/react-native';

import { WateringSlider } from './WateringSlider';

const meta = {
  title: 'Watering/WateringSlider',
  component: WateringSlider,
} satisfies Meta<typeof WateringSlider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Idle: Story = {};

export const Pulled: Story = {
  args: {
    state: 'pulled',
  },
};

export const Completed: Story = {
  args: {
    state: 'completed',
  },
};
