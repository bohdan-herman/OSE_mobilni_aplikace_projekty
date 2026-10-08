import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { radius, spacing, Theme, typography, useTheme, useThemedStyles } from '../../../theme';

export function EmptyState() {
  const theme = useTheme();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="sparkles-outline" size={32} color={theme.colors.primary} />
      </View>
      <Text style={styles.title}>Žádné úkoly</Text>
      <Text style={styles.hint}>Přidej první úkol pomocí pole nahoře.</Text>
    </View>
  );
}

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: spacing.xl * 2,
      gap: spacing.sm,
    },
    badge: {
      width: 72,
      height: 72,
      borderRadius: radius.round,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      backgroundColor: colors.surfaceMuted,
    },
    title: {
      ...typography.body,
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
    },
    hint: {
      ...typography.subtitle,
      color: colors.textMuted,
      textAlign: 'center',
    },
  });
