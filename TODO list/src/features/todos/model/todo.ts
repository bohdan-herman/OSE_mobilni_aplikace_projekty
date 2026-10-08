export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export const MAX_TITLE_LENGTH = 200;

/**
 * Normalizes a task title. Returns `null` when the title is empty
 * (or only whitespace) — such a task must not be added.
 */
export function validateTitle(raw: string): string | null {
  const title = raw.trim().replace(/\s+/g, ' ');
  if (title.length === 0) return null;
  return title.slice(0, MAX_TITLE_LENGTH);
}

export function createTodo(title: string, now: number = Date.now()): Todo {
  return {
    id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    done: false,
    createdAt: now,
  };
}
