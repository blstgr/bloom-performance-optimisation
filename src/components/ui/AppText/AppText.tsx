import React from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { colors, typography } from '../../../theme';

export type AppTextVariant =
  | 'hero'
  | 'headline'
  | 'title'
  | 'sectionTitle'
  | 'body'
  | 'button'
  | 'caption';

export type AppTextTone = 'primary' | 'secondary' | 'muted' | 'inverse' | 'dark';

export type AppTextProps = TextProps & {
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
  tone?: AppTextTone;
  variant?: AppTextVariant;
};

export function AppText({
  align = 'left',
  children,
  style,
  tone = 'primary',
  variant = 'body',
  ...textProps
}: AppTextProps) {
  return (
    <Text
      style={[
        styles.base,
        typography[variant],
        { color: colors.text[tone], textAlign: align },
        style,
      ]}
      {...textProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    letterSpacing: 0,
  },
});
