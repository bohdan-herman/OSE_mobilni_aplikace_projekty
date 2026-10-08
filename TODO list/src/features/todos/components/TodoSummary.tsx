import { StyleSheet, Text } from 'react-native';

import { colors } from '../../../theme';
import { selectRemainingCount, selectTodos, useTodoStore } from '../store';

export function TodoSummary() {
  const total = useTodoStore((state) => selectTodos(state).length);
  const remaining = useTodoStore(selectRemainingCount);

  if (total === 0) return null;

  return (
    <Text style={styles.text} accessibilityLiveRegion="polite">
      Hotovo {total - remaining} z {total}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    opacity: 0.6,
  },
});
