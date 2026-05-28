import { Platform } from 'react-native';

export const fontFamilies = {
  display: Platform.select({
    ios: 'CabinetGrotesk-Black',
    android: 'sans-serif-condensed',
    default: 'CabinetGrotesk-Black',
  }),
  body: Platform.select({
    ios: 'Satoshi-Medium',
    android: 'sans-serif',
    default: 'Satoshi-Medium',
  }),
} as const;

export const typography = {
  hero: {
    fontFamily: fontFamilies.display,
    fontSize: 40,
    lineHeight: 44,
  },
  headline: {
    fontFamily: fontFamilies.display,
    fontSize: 32,
    lineHeight: 36,
  },
  title: {
    fontFamily: fontFamilies.display,
    fontSize: 24,
    lineHeight: 30,
  },
  sectionTitle: {
    fontFamily: fontFamilies.display,
    fontSize: 17,
    lineHeight: 26,
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 17,
    lineHeight: 26,
  },
  button: {
    fontFamily: fontFamilies.body,
    fontSize: 17,
    lineHeight: 24,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 21,
  },
} as const;
