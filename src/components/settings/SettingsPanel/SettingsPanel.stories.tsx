import type { Meta, StoryObj } from '@storybook/react-native';

import { SettingsPanel } from './SettingsPanel';

const meta = {
  title: 'Settings/SettingsPanel',
  component: SettingsPanel,
  args: {
    rows: [
      { label: 'Email', value: 'plantkiller@gmail.com', actionLabel: 'Edit' },
      { label: 'Password', value: '*****', actionLabel: 'Reset' },
    ],
  },
} satisfies Meta<typeof SettingsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
