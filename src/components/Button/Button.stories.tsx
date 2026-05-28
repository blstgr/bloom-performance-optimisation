import type { Meta, StoryObj } from '@storybook/react-native';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    label: 'Continue',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'google',
    label: 'Continue with Google',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'plus',
    label: undefined,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const LoadingOnly: Story = {
  args: {
    label: undefined,
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
