import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createTodo, Todo, validateTitle } from '../model';

export type TodoState = {
  todos: Todo[];
  /** Adds a task to the top of the list. Returns `false` if the title is empty. */
  addTodo: (title: string) => boolean;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const TODO_STORAGE_KEY = 'todo-list/todos';

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (raw) => {
        const title = validateTitle(raw);
        if (!title) return false;
        set((state) => ({ todos: [createTodo(title), ...state.todos] }));
        return true;
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
        })),
      deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    }),
    {
      name: TODO_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ todos: state.todos }),
    }
  )
);

/** Selectors */
export const selectTodos = (state: TodoState) => state.todos;
export const selectRemainingCount = (state: TodoState) =>
  state.todos.filter((todo) => !todo.done).length;
