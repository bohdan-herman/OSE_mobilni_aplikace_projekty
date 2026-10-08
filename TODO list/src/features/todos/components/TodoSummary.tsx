import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { radius, spacing, Theme, typography, useThemedStyles } from '../../../theme';
import { selectRemainingCount, selectTodos, useTodoStore } from '../store';

export function TodoSummary() {
  const styles = useThemedStyles(createStyles);
  const total = useTodoStore((state) => selectTodos(state).length);
  const remaining = useTodoStore(selectRemainingCount);
  const done = total - remaining;
  const ratio = total === 0 ? 0 : done / total;

  // Width animations can't use the native driver.
  const [progress] = useState(() => new Animated.Value(ratio));
  useEffect(() => {
    Animated.timing(progress, { toValue: ratio, duration: 300, useNativeDriver: false }).start();
  }, [progress, ratio]);

  if (total === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text} accessibilityLiveRegion="polite">
        Hotovo {done} z {total}
      </Text>
      <View
        style={styles.track}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: total, now: done }}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      gap: spacing.sm,
    },
    text: {
      ...typography.caption,
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    track: {
      height: 6,
      borderRadius: radius.round,
      backgroundColor: colors.surfaceMuted,
      overflow: 'hidden',
    },
    fill: {
      height: '100%',
      borderRadius: radius.round,
      backgroundColor: colors.success,
    },
  });
