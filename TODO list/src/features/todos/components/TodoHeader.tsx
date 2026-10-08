import { StyleSheet, Text, View } from 'react-native';

import { spacing, Theme, typography, useThemedStyles } from '../../../theme';

function formatToday(date: Date) {
  try {
    return date.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });
  } catch {
    return date.toDateString();
  }
}

export function TodoHeader() {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatToday(new Date())}</Text>
      <Text style={styles.title} accessibilityRole="header">
        Moje úkoly
      </Text>
    </View>
  );
}

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      gap: spacing.xs,
    },
    date: {
      ...typography.subtitle,
      color: colors.primary,
      textTransform: 'capitalize',
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
  });
