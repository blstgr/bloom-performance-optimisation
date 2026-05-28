import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../../../theme';
import { AppText } from '../../ui/AppText';
import { Icon } from '../../ui/Icon';

export type ScheduleItem = {
  completed?: boolean;
  day: string;
  id: string;
  month: string;
};

export type WateringScheduleProps = {
  items: ScheduleItem[];
  title?: string;
};

export function WateringSchedule({
  items,
  title = 'Watering schedule',
}: WateringScheduleProps) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Icon name="schedule" size={20} />
        <AppText variant="sectionTitle">{title}</AppText>
      </View>
      <View style={styles.dates}>
        {items.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={[styles.iconCircle, item.completed && styles.completed]}>
              <Icon
                name={item.completed ? 'check' : 'water'}
                color={item.completed ? colors.icon.inverse : colors.icon.primary}
                size={16}
              />
            </View>
            <AppText align="center" variant="caption">
              {item.day}
            </AppText>
            <AppText align="center" variant="caption">
              {item.month}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completed: {
    backgroundColor: colors.action.primary,
  },
  container: {
    gap: spacing.lg,
    width: '100%',
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xxs,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.surface.white,
    borderRadius: 50,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  item: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
});
