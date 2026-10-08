export type Palette = {
  background: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  success: string;
  danger: string;
};

export const lightPalette: Palette = {
  background: '#F4F1EA',
  surface: '#FFFFFF',
  surfaceMuted: '#ECE8DE',
  text: '#1C1B1F',
  textMuted: '#6B675F',
  border: '#E3DED3',
  primary: '#4F46E5',
  onPrimary: '#FFFFFF',
  success: '#15803D',
  danger: '#DC2626',
};

export const darkPalette: Palette = {
  background: '#14131A',
  surface: '#1E1D26',
  surfaceMuted: '#2A2934',
  text: '#ECEAF4',
  textMuted: '#9C99A8',
  border: '#2C2B36',
  primary: '#818CF8',
  onPrimary: '#14131A',
  success: '#4ADE80',
  danger: '#F87171',
};
