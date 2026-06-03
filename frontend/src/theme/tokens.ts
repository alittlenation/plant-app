import { Platform } from 'react-native';

export const colors = {
  background: '#F7F4EC',
  surface: '#FFFCF6',
  surfaceMuted: '#F1EBDD',
  primary: '#2F6F4E',
  primaryDark: '#1F4D36',
  primarySoft: '#DDEBDD',
  accent: '#C8894D',
  text: '#1E3027',
  textMuted: '#647267',
  textSubtle: '#8A948B',
  border: '#E4DCCF',
  danger: '#B94B3D',
  dangerSoft: '#F6DDD7',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
};

export const typography = {
  hero: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900' as const,
    color: colors.text,
  },
  title: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '900' as const,
    color: colors.text,
  },
  section: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '900' as const,
    color: colors.text,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500' as const,
    color: colors.textMuted,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '800' as const,
    color: colors.text,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    color: colors.textSubtle,
  },
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#1F3026',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 18,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  floating: Platform.select({
    ios: {
      shadowColor: '#1F3026',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.14,
      shadowRadius: 24,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
};
