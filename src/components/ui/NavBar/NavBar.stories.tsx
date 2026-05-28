import type { Meta, StoryObj } from '@storybook/react-native';

import { NavBar } from './NavBar';

const items = [
  { key: 'home', icon: 'home' as const },
  { key: 'add', icon: 'plus' as const },
  { key: 'watering', icon: 'water' as const, badgeCount: 3 },
];

const meta = {
  title: 'UI/NavBar',
  component: NavBar,
  args: {
    activeKey: 'home',
    items,
  },
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomeActive: Story = {};

export const WateringActive: Story = {
  args: {
    activeKey: 'watering',
    items,
  },
};

export const CameraOnly: Story = {
  args: {
    activeKey: 'camera',
    items: [{ key: 'camera', icon: 'camera' }],
  },
};
