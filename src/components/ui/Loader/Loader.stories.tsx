import type { Meta, StoryObj } from '@storybook/react-native';

import { Loader } from './Loader';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  args: {
    overlay: true,
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
