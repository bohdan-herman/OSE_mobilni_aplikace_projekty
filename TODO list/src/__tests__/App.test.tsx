import { render, screen } from '@testing-library/react-native';

import App from '../../App';

test('renders the app header', async () => {
  await render(<App />);
  expect(screen.getByRole('header', { name: 'Moje úkoly' })).toBeOnTheScreen();
  expect(screen.getByLabelText('Nový úkol')).toBeOnTheScreen();
});
