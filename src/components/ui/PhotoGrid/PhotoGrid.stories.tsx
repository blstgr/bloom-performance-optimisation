import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { PhotoGrid } from './PhotoGrid';
import { PhotoRow } from './PhotoRow';

const images = [
  'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
  'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400',
  'https://images.unsplash.com/photo-1521334884684-d80222895322?w=400',
  'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400',
  'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400',
].map((uri, index) => ({ id: `${index}`, uri }));

const meta = {
  title: 'UI/PhotoGrid',
  component: PhotoGrid,
  args: {
    images,
  },
} satisfies Meta<typeof PhotoGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {};

export const TwoRowsTall: Story = {
  args: {
    columns: 3,
    itemAspectRatio: 0.72,
    images: images.slice(0, 4),
  },
};

export const SingleRow: Story = {
  render: () => <PhotoRow image={images[0]} />,
};
