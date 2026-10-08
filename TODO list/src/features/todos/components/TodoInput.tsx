import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, spacing } from '../../../theme';
import { validateTitle } from '../model';
import { useTodoStore } from '../store';

export function TodoInput() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState('');
  const canAdd = validateTitle(title) !== null;

  const submit = () => {
    if (addTodo(title)) setTitle('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={submit}
        placeholder="Co je potřeba udělat?"
        accessibilityLabel="Nový úkol"
        returnKeyType="done"
        submitBehavior="submit"
      />
      <Pressable
        style={[styles.button, !canAdd && styles.buttonDisabled]}
        onPress={submit}
        disabled={!canAdd}
        accessibilityRole="button"
        accessibilityLabel="Přidat úkol"
      >
        <Text style={styles.buttonText}>Přidat</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D6D1C4',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    backgroundColor: '#FFFFFF',
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    backgroundColor: colors.text,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
