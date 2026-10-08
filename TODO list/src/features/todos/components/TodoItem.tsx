import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing, Theme, typography, useTheme, useThemedStyles } from '../../../theme';
import { Todo } from '../model';
import { useTodoStore } from '../store';

type Props = {
  todo: Todo;
};

const useNativeDriver = Platform.OS !== 'web';

export function TodoItem({ todo }: Props) {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  // Fade + slide in when the task appears.
  const [appear] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(appear, { toValue: 1, duration: 220, useNativeDriver }).start();
  }, [appear]);

  return (
    <Animated.View
      style={[
        styles.card,
        todo.done && styles.cardDone,
        {
          opacity: appear,
          transform: [
            { translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) },
          ],
        },
      ]}
    >
      <Pressable
        style={styles.toggle}
        onPress={() => toggleTodo(todo.id)}
        accessibilityRole="checkbox"
        aria-checked={todo.done}
        accessibilityLabel={todo.title}
        hitSlop={8}
      >
        <View style={[styles.checkbox, todo.done && styles.checkboxChecked]}>
          {todo.done && <Ionicons name="checkmark" size={16} color={theme.colors.onPrimary} />}
        </View>
        <Text style={[styles.title, todo.done && styles.titleDone]}>{todo.title}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.delete, pressed && styles.deletePressed]}
        onPress={() => deleteTodo(todo.id)}
        accessibilityRole="button"
        accessibilityLabel={`Smazat úkol ${todo.title}`}
        hitSlop={8}
      >
        <Ionicons name="trash-outline" size={20} color={theme.colors.danger} />
      </Pressable>
    </Animated.View>
  );
}

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingVertical: spacing.md - 2,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.sm,
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardDone: {
      backgroundColor: colors.surfaceMuted,
    },
    toggle: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    checkbox: {
      width: 26,
      height: 26,
      borderRadius: radius.round,
      borderWidth: 2,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: colors.primary,
    },
    title: {
      ...typography.body,
      flex: 1,
      color: colors.text,
    },
    titleDone: {
      color: colors.textMuted,
      textDecorationLine: 'line-through',
    },
    delete: {
      padding: spacing.xs,
      borderRadius: radius.sm,
    },
    deletePressed: {
      backgroundColor: colors.surfaceMuted,
    },
  });
