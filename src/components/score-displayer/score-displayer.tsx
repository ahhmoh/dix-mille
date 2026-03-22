import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type ScoreDisplayerProps = {
  score?: string;
};

export function ScoreDisplayer({ score }: ScoreDisplayerProps) {
  return (
    <View style={styles.stepRow}>
        <Text>{ score }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});
