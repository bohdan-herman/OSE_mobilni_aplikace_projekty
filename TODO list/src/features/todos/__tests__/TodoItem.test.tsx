import { render, screen, userEvent } from '@testing-library/react-native';

import { TodoList, TodoSummary } from '../components';
import { useTodoStore } from '../store';

function Screen() {
  return (
    <>
      <TodoSummary />
      <TodoList />
    </>
  );
}

beforeEach(() => {
  useTodoStore.setState({
    todos: [
      { id: '1', title: 'Vynést koš', done: false, createdAt: 1 },
      { id: '2', title: 'Uklidit pokoj', done: false, createdAt: 2 },
    ],
  });
});

test('marks a task as done and back', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  const checkbox = screen.getByRole('checkbox', { name: 'Vynést koš' });
  expect(checkbox).not.toBeChecked();

  await user.press(checkbox);
  expect(checkbox).toBeChecked();
  expect(useTodoStore.getState().todos[0].done).toBe(true);
  expect(screen.getByText('Vynést koš')).toHaveStyle({ textDecorationLine: 'line-through' });

  await user.press(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('shows how many tasks are done', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  expect(screen.getByText('Hotovo 0 z 2')).toBeOnTheScreen();
  await user.press(screen.getByRole('checkbox', { name: 'Uklidit pokoj' }));
  expect(screen.getByText('Hotovo 1 z 2')).toBeOnTheScreen();
});

test('deletes a task', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  await user.press(screen.getByRole('button', { name: 'Smazat úkol Vynést koš' }));

  expect(screen.queryByText('Vynést koš')).not.toBeOnTheScreen();
  expect(screen.getByText('Uklidit pokoj')).toBeOnTheScreen();
  expect(useTodoStore.getState().todos).toHaveLength(1);
});

test('shows empty state after deleting the last task', async () => {
  const user = userEvent.setup();
  useTodoStore.setState({ todos: [{ id: '1', title: 'Jediný', done: true, createdAt: 1 }] });
  await render(<Screen />);

  await user.press(screen.getByRole('button', { name: 'Smazat úkol Jediný' }));

  expect(screen.getByText('Žádné úkoly')).toBeOnTheScreen();
  expect(screen.queryByText(/Hotovo/)).not.toBeOnTheScreen();
});
