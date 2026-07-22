import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const theme = useTheme();

type ScoreDisplayerProps = {
  score?: number;
};

export function ScoreDisplayer({ score }: ScoreDisplayerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text
            style={styles.score}
            numberOfLines={1}
          >
            {score ?? ''}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  scoreContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
  },
  fillerCol: {
    flex: 1,
    justifyContent: 'center',
  },
  score: {
    fontSize: 60,
    color: theme.primary,
    paddingLeft: 10,
    paddingRight: 10,
    userSelect: 'none',
  },
  btnPrevious: {
    width: 60,
    height: 60,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
  },
  btnPreviousPressed: {
    backgroundColor: theme.secondary,
  },
  btnPreviousDisabled: {
    backgroundColor: theme.secondary,
  },
});
