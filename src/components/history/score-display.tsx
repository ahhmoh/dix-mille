import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Score } from '../scores/scores';

interface ScoreDisplayProps {
  score: Score;
  style?: StyleProp<TextStyle>;
}

export const ScoreDisplay = ({ score, style }: ScoreDisplayProps) => {
  const isCanceled = score.misses >= 3;
  const missesNumberToShow = isCanceled ? 2 : score.misses;
  return (
    <Text style={[style, isCanceled && styles.scoreCanceled]}>
      {score.value} {'|'.repeat(missesNumberToShow)}
    </Text>
  );
};

const styles = StyleSheet.create({ scoreCanceled: { textDecorationLine: 'line-through' } });
