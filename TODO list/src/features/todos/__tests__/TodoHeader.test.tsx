import { formatToday } from '../components/TodoHeader';

test('capitalizes only the first letter of the date', () => {
  const text = formatToday(new Date(2026, 9, 8));
  expect(text.charAt(0)).toBe(text.charAt(0).toUpperCase());
  expect(text.slice(1)).toBe(text.slice(1).toLowerCase());
});
