import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const theme = useTheme();

type ScoreDisplayerProps = { score?: number };

export function ScoreDisplayer({ score }: ScoreDisplayerProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  score: { fontSize: 60, color: theme.primary },
});
