import { useTheme } from '@/hooks/use-theme';
import { Fontisto } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const theme = useTheme();

type ScoreDisplayerProps = {
  score?: number;
  onPreviousBtnClicked: () => void;
  isBtnPreviousScoreDisabled: boolean;
};

export function ScoreDisplayer({ score, onPreviousBtnClicked, isBtnPreviousScoreDisabled }: ScoreDisplayerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.fillerCol}></View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.score}>{score}</Text>
        </View>
      </View>
      <View style={styles.fillerCol}>
        <Pressable
          onPress={onPreviousBtnClicked}
          disabled={isBtnPreviousScoreDisabled}
          style={({ pressed }) => [
            styles.btnPrevious,
            pressed && styles.btnPreviousPressed,
            isBtnPreviousScoreDisabled && styles.btnPreviousDisabled,
          ]}
        >
          <Fontisto
            name='arrow-return-left'
            size={40}
            color={theme.primary}
          />
        </Pressable>
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
    flex: 2.3,
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
