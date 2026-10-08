import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../../../theme';
import { Todo } from '../model';
import { useTodoStore } from '../store';

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.toggle}
        onPress={() => toggleTodo(todo.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: todo.done }}
        accessibilityLabel={todo.title}
        hitSlop={8}
      >
        <Ionicons
          name={todo.done ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={colors.text}
        />
        <Text style={[styles.title, todo.done && styles.titleDone]}>{todo.title}</Text>
      </Pressable>
      <Pressable
        onPress={() => deleteTodo(todo.id)}
        accessibilityRole="button"
        accessibilityLabel={`Smazat úkol ${todo.title}`}
        hitSlop={8}
      >
        <Ionicons name="trash-outline" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D6D1C4',
  },
  toggle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
});
