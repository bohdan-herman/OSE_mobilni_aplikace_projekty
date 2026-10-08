import { StyleSheet, Text, View } from 'react-native';

import { spacing, Theme, typography, useThemedStyles } from '../../../theme';

export function formatToday(date: Date) {
  let text: string;
  try {
    text = date.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });
  } catch {
    text = date.toDateString();
  }
  // "čtvrtek 8. října" -> "Čtvrtek 8. října" (capitalize only the first letter)
  return text.charAt(0).toUpperCase() + text.slice(1);
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
    },
    title: {
      ...typography.title,
      color: colors.text,
    },
  });
