import { render, screen, userEvent } from '@testing-library/react-native';

import { TodoInput, TodoList } from '../components';
import { useTodoStore } from '../store';

function Screen() {
  return (
    <>
      <TodoInput />
      <TodoList />
    </>
  );
}

beforeEach(() => {
  useTodoStore.setState({ todos: [] });
});

test('shows empty state when there are no tasks', async () => {
  await render(<Screen />);
  expect(screen.getByText('Žádné úkoly')).toBeOnTheScreen();
});

test('adds a task and clears the input', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  const input = screen.getByLabelText('Nový úkol');
  await user.type(input, 'Koupit mléko');
  await user.press(screen.getByRole('button', { name: 'Přidat úkol' }));

  expect(screen.getByText('Koupit mléko')).toBeOnTheScreen();
  expect(screen.queryByText('Žádné úkoly')).not.toBeOnTheScreen();
  expect(input).toHaveDisplayValue('');
});

test('adds a task with the keyboard submit key', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  await user.type(screen.getByLabelText('Nový úkol'), 'Zavolat mámě', { submitEditing: true });

  expect(screen.getByText('Zavolat mámě')).toBeOnTheScreen();
});

test('does not add an empty task', async () => {
  const user = userEvent.setup();
  await render(<Screen />);

  const button = screen.getByRole('button', { name: 'Přidat úkol' });
  expect(button).toBeDisabled();

  await user.type(screen.getByLabelText('Nový úkol'), '    ');
  expect(button).toBeDisabled();

  await user.press(button);
  expect(useTodoStore.getState().todos).toHaveLength(0);
  expect(screen.getByText('Žádné úkoly')).toBeOnTheScreen();
});

test('renders the list of tasks', async () => {
  useTodoStore.setState({
    todos: [
      { id: '1', title: 'První', done: false, createdAt: 1 },
      { id: '2', title: 'Druhý', done: true, createdAt: 2 },
    ],
  });
  await render(<TodoList />);

  expect(screen.getByText('První')).toBeOnTheScreen();
  expect(screen.getByText('Druhý')).toBeOnTheScreen();
});
