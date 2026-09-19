import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Reanimated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { colors, fontFamilies, radii, spacing } from '../../../theme';
import { AppText } from '../AppText';

// Vertical padding + the body variant's line height (typography.body.lineHeight, 26) sum to the
// Figma spec's 32px badge height, rather than a separately hardcoded height.
const TAB_VERTICAL_PADDING = 3;
// Matches WateringCard's COLLAPSE_DURATION_MS so transitions feel like one system.
const TAB_TRANSITION_DURATION_MS = 180;
const TAB_PRESSED_SCALE = 0.94;
const PRESSED = 1;
const RELEASED = 0;

export type TabItem<Key extends string = string> = {
  key: Key;
  label: string;
};

export type TabsProps<Key extends string = string> = {
  activeKey: Key;
  onTabPress: (key: Key) => void;
  tabs: TabItem<Key>[];
};

type TabButtonProps<Key extends string> = {
  isActive: boolean;
  label: string;
  onTabPress: (key: Key) => void;
  tabKey: Key;
};

/** One tab. Split out of `Tabs` because each tab owns its own shared values, and hooks can't be
 * called from inside the `tabs.map()` loop. */
function TabButton<Key extends string>({
  isActive,
  label,
  onTabPress,
  tabKey,
}: TabButtonProps<Key>) {
  const activeProgress = useSharedValue(isActive ? 1 : 0);
  const pressProgress = useSharedValue(RELEASED);

  React.useEffect(() => {
    activeProgress.value = withTiming(isActive ? 1 : 0, {
      duration: TAB_TRANSITION_DURATION_MS,
    });
  }, [activeProgress, isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      activeProgress.value,
      [0, 1],
      [colors.surface.white, colors.surface.dark],
    ),
    transform: [{ scale: 1 - pressProgress.value * (1 - TAB_PRESSED_SCALE) }],
  }));

  const handlePress = React.useCallback(() => onTabPress(tabKey), [onTabPress, tabKey]);
  const handlePressIn = React.useCallback(() => {
    pressProgress.value = withSpring(PRESSED);
  }, [pressProgress]);
  const handlePressOut = React.useCallback(() => {
    pressProgress.value = withSpring(RELEASED);
  }, [pressProgress]);

  return (
    <TouchableOpacity
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Reanimated.View style={[styles.tab, animatedStyle]}>
        <AppText style={styles.tabLabel} tone={isActive ? 'inverse' : 'primary'} variant="body">
          {label}
        </AppText>
      </Reanimated.View>
    </TouchableOpacity>
  );
}

export function Tabs<Key extends string = string>({ activeKey, onTabPress, tabs }: TabsProps<Key>) {
  return (
    <ScrollView
      accessibilityRole="tablist"
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}>
      {tabs.map(tab => (
        <TabButton
          key={tab.key}
          isActive={tab.key === activeKey}
          label={tab.label}
          onTabPress={onTabPress}
          tabKey={tab.key}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  scroll: {
    flexGrow: 0,
  },
  tab: {
    borderRadius: radii.pill,
    paddingHorizontal: spacing.xs,
    paddingVertical: TAB_VERTICAL_PADDING,
  },
  // Figma specs Satoshi Black for this label; only Satoshi-Medium and Satoshi-Bold are bundled in
  // this project, so Bold is the closest available match — kept as a style override rather than a
  // new AppText variant since no other text in the app uses this size/weight combination.
  tabLabel: {
    fontFamily: fontFamilies.bodyBold,
  },
});
