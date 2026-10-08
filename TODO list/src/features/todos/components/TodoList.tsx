import { FlatList, StyleSheet } from 'react-native';

import { spacing } from '../../../theme';
import { selectTodos, useTodoStore } from '../store';
import { EmptyState } from './EmptyState';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useTodoStore(selectTodos);

  return (
    <FlatList
      data={todos}
      keyExtractor={(todo) => todo.id}
      renderItem={({ item }) => <TodoItem todo={item} />}
      ListEmptyComponent={EmptyState}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      accessibilityLabel="Seznam úkolů"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
});
