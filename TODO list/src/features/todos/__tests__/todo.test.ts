import { createTodo, MAX_TITLE_LENGTH, validateTitle } from '../model';

describe('validateTitle', () => {
  it.each(['', ' ', '   ', '\n\t '])('rejects empty title %j', (raw) => {
    expect(validateTitle(raw)).toBeNull();
  });

  it('trims and collapses whitespace', () => {
    expect(validateTitle('  Koupit   mléko  ')).toBe('Koupit mléko');
  });

  it('limits title length', () => {
    expect(validateTitle('a'.repeat(MAX_TITLE_LENGTH + 50))).toHaveLength(MAX_TITLE_LENGTH);
  });
});

describe('createTodo', () => {
  it('creates an unfinished task', () => {
    const todo = createTodo('Úkol', 1000);
    expect(todo).toMatchObject({ title: 'Úkol', done: false, createdAt: 1000 });
    expect(todo.id).toEqual(expect.any(String));
  });

  it('generates unique ids', () => {
    expect(createTodo('a', 1).id).not.toBe(createTodo('a', 1).id);
  });
});
