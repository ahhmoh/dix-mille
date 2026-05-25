import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Score } from '../scores/scores';

interface ScoreDisplayProps {
  score: Score;
  style?: StyleProp<TextStyle>;
}

export const ScoreDisplay = ({ score, style }: ScoreDisplayProps) => {
  const isInvalid = score.misses >= 3 || score.isCanceled;

  return (
    <Text style={[style, isInvalid && styles.scoreCanceled]}>
      {score.value} {'|'.repeat(Math.min(score.misses, 2))}
    </Text>
  );
};

const styles = StyleSheet.create({ scoreCanceled: { textDecorationLine: 'line-through' } });
