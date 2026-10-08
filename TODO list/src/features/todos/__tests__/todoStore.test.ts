import AsyncStorage from '@react-native-async-storage/async-storage';

import { selectRemainingCount, TODO_STORAGE_KEY, useTodoStore } from '../store';

const store = () => useTodoStore.getState();

beforeEach(async () => {
  useTodoStore.setState({ todos: [] });
  await AsyncStorage.clear();
});

describe('addTodo', () => {
  it('adds a task to the top of the list', () => {
    expect(store().addTodo('První')).toBe(true);
    expect(store().addTodo('Druhý')).toBe(true);
    expect(store().todos.map((t) => t.title)).toEqual(['Druhý', 'První']);
  });

  it.each(['', '   '])('does not add an empty task %j', (title) => {
    expect(store().addTodo(title)).toBe(false);
    expect(store().todos).toHaveLength(0);
  });
});

describe('toggleTodo', () => {
  it('toggles done back and forth', () => {
    store().addTodo('Úkol');
    const { id } = store().todos[0];

    store().toggleTodo(id);
    expect(store().todos[0].done).toBe(true);

    store().toggleTodo(id);
    expect(store().todos[0].done).toBe(false);
  });

  it('ignores unknown id', () => {
    store().addTodo('Úkol');
    store().toggleTodo('nope');
    expect(store().todos[0].done).toBe(false);
  });
});

describe('deleteTodo', () => {
  it('removes only the given task', () => {
    store().addTodo('A');
    store().addTodo('B');
    const [b, a] = store().todos;

    store().deleteTodo(b.id);
    expect(store().todos).toEqual([a]);
  });
});

describe('selectors', () => {
  it('counts unfinished tasks', () => {
    store().addTodo('A');
    store().addTodo('B');
    store().toggleTodo(store().todos[0].id);
    expect(selectRemainingCount(store())).toBe(1);
  });
});

describe('persistence', () => {
  it('saves tasks to AsyncStorage', async () => {
    store().addTodo('Uložit mě');
    await new Promise((resolve) => setTimeout(resolve, 0));

    const raw = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    expect(JSON.parse(raw!).state.todos[0].title).toBe('Uložit mě');
  });

  it('restores tasks from AsyncStorage', async () => {
    await AsyncStorage.setItem(
      TODO_STORAGE_KEY,
      JSON.stringify({
        state: { todos: [{ id: '1', title: 'Obnovený', done: true, createdAt: 1 }] },
        version: 1,
      })
    );

    await useTodoStore.persist.rehydrate();
    expect(store().todos).toEqual([{ id: '1', title: 'Obnovený', done: true, createdAt: 1 }]);
  });
});
