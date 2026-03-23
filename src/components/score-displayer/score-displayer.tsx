import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type ScoreDisplayerProps = {
    score?: number;
};

export function ScoreDisplayer({ score }: ScoreDisplayerProps) {
  return (
    <View style={styles.stepRow}>
          <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
    score: {
        fontSize: 60
    }
});
