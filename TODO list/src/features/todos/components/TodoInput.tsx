import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { radius, spacing, Theme, typography, useTheme, useThemedStyles } from '../../../theme';
import { MAX_TITLE_LENGTH, validateTitle } from '../model';
import { useTodoStore } from '../store';

export function TodoInput() {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState('');
  const canAdd = validateTitle(title) !== null;

  const submit = () => {
    if (addTodo(title)) setTitle('');
  };

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={submit}
        placeholder="Co je potřeba udělat?"
        placeholderTextColor={theme.colors.textMuted}
        accessibilityLabel="Nový úkol"
        returnKeyType="done"
        submitBehavior="submit"
        maxLength={MAX_TITLE_LENGTH}
        selectionColor={theme.colors.primary}
      />
      <Pressable
        style={({ pressed }) => [
          styles.button,
          !canAdd && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={submit}
        disabled={!canAdd}
        accessibilityRole="button"
        accessibilityLabel="Přidat úkol"
      >
        <Ionicons name="add" size={26} color={theme.colors.onPrimary} />
      </Pressable>
    </View>
  );
}

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.xs + 2,
      paddingLeft: spacing.md,
      borderRadius: radius.lg,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    input: {
      ...typography.body,
      flex: 1,
      paddingVertical: spacing.sm,
      color: colors.text,
    },
    button: {
      width: 44,
      height: 44,
      borderRadius: radius.md,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    buttonDisabled: {
      opacity: 0.35,
    },
    buttonPressed: {
      transform: [{ scale: 0.94 }],
    },
  });
