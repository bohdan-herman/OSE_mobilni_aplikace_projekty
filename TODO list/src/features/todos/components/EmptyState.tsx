import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../../../theme';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Žádné úkoly</Text>
      <Text style={styles.hint}>Přidej první úkol pomocí pole nahoře.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.lg * 2,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    color: colors.text,
    opacity: 0.6,
  },
});
