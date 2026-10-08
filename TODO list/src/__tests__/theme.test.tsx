import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';

import { darkPalette, lightPalette, useTheme } from '../theme';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedScheme = useColorScheme as jest.Mock;

test('uses the light palette by default', async () => {
  mockedScheme.mockReturnValue('light');
  const { result } = await renderHook(() => useTheme());
  expect(result.current).toEqual({ dark: false, colors: lightPalette });
});

test('uses the dark palette in dark mode', async () => {
  mockedScheme.mockReturnValue('dark');
  const { result } = await renderHook(() => useTheme());
  expect(result.current).toEqual({ dark: true, colors: darkPalette });
});
