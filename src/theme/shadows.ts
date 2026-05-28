import { Platform } from 'react-native';

export const shadows = {
  soft: Platform.select({
    ios: {
      shadowColor: '#2B261F',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
} as const;
