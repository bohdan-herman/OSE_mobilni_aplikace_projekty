import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { darkPalette, lightPalette, Palette } from './colors';

export * from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  round: 999,
};

export const typography = {
  title: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, fontWeight: '500' },
  body: { fontSize: 16, fontWeight: '500' },
  caption: { fontSize: 13, fontWeight: '600' },
} as const;

export type Theme = {
  dark: boolean;
  colors: Palette;
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return useMemo(
    () =>
      scheme === 'dark'
        ? { dark: true, colors: darkPalette }
        : { dark: false, colors: lightPalette },
    [scheme]
  );
}

/** Builds a StyleSheet from the current theme and memoizes it. */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}
