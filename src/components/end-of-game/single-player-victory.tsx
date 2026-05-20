import { colors } from '@/constants/theme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { Player } from '../player/player';

interface SinglePlayerVictoryProps {
  winner: Player;
}

export const SinglePlayerVictory = ({ winner }: SinglePlayerVictoryProps) => {
  return (
    <View style={styles.winnerContainer}>
      <MaterialCommunityIcons
        name='crown'
        size={60}
        style={styles.crownWinner}
      />
      <Text style={styles.playerName}>{winner.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  winnerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  crownWinner: { alignSelf: 'center', color: '#cfa312' },
  playerName: { fontSize: 25, fontWeight: 'bold', color: colors.primary, marginTop: 25 },
});
