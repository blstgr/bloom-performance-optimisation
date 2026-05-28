import type { Meta, StoryObj } from '@storybook/react-native';

import { WateringSchedule } from './WateringSchedule';

const items = [
  { id: '1', day: '15', month: 'May' },
  { id: '2', day: '29', month: 'May' },
  { id: '3', day: '13', month: 'Jun' },
  { id: '4', day: '25', month: 'Jun' },
  { id: '5', day: '9', month: 'Jul' },
  { id: '6', day: '23', month: 'Jul' },
  { id: '7', day: '7', month: 'Aug' },
];

const meta = {
  title: 'Watering/WateringSchedule',
  component: WateringSchedule,
  args: {
    items,
  },
} satisfies Meta<typeof WateringSchedule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Upcoming: Story = {};

export const CompletedFirst: Story = {
  args: {
    items: [{ ...items[0], completed: true }, ...items.slice(1)],
  },
};
