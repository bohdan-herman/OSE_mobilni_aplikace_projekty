import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../../../theme';
import { Todo } from '../model';

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{todo.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D6D1C4',
  },
  title: {
    color: colors.text,
    fontSize: 16,
  },
});
