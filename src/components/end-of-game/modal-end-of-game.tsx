import { useTheme } from '@/hooks/use-theme';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Player } from '../player/player';
import { scoreService } from '../scores/scores.service';
import { Podium } from './podium';
import { SinglePlayerVictory } from './single-player-victory';

const theme = useTheme();

interface ModalEndOfGameProps {
  visible: boolean;
  players: Player[];
  onCloseModal: () => void;
}

export const ModalEndOfGame = ({ visible, players, onCloseModal }: ModalEndOfGameProps) => {
  const showPodium = players.length >= 3;

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {players.length != 0 &&
            (showPodium ? (
              <Podium players={scoreService.getTopPlayers(players)} />
            ) : (
              <SinglePlayerVictory winner={scoreService.getTopPlayer(players)} />
            ))}

          <View style={styles.btnRow}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonClosePressed : styles.buttonClose]}
              onPress={onCloseModal}
            >
              <Text style={styles.btnText}>Ok bg</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center' },
  modalView: {
    flex: 0.4,
    margin: 20,
    backgroundColor: theme.background,
    borderRadius: 20,
    padding: 35,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnRow: { flex: 0.3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  button: { flex: 0.7, justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 10, margin: 5 },
  buttonClose: { backgroundColor: theme.primary },
  buttonClosePressed: { backgroundColor: theme.secondary },
  btnText: { color: theme.background, fontWeight: 'bold', textAlign: 'center', fontSize: 30 },
});
