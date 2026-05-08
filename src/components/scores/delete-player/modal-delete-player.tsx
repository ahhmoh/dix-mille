import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../constants/theme';
import { Player } from '../../player/player';

type ModalDeletePlayerProps = {
  isVisible: boolean;
  player: Player;
  onCancel: () => void;
  onValidate: (player: Player) => void;
};

export function ModalDeletePlayer({ isVisible, player, onCancel, onValidate }: ModalDeletePlayerProps) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>Supprimer {player.name} ?</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonCancelPressed : styles.buttonCancel]}
              onPress={onCancel}
            >
              <Text style={styles.textBtn}>NON</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonValidatePressed : styles.buttonValidate]}
              onPress={() => onValidate(player)}
            >
              <Text style={styles.textBtn}>OUI</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  text: { fontSize: 30 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  btnDeletePressed: { backgroundColor: colors.background },
  btnDeleteText: { fontSize: 30 },
  playerName: { width: '40%', fontSize: 30 },
  buttonCancel: { backgroundColor: colors.primary },
  buttonCancelPressed: { backgroundColor: colors.secondary },
  buttonValidate: { backgroundColor: colors.primary },
  buttonValidatePressed: { backgroundColor: colors.secondary },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 5, width: 100 },
  textBtn: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 },
});
