import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: { fontSize: 40 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  btnDeletePressed: { backgroundColor: '#d2d2d2' },
  btnDeleteText: { fontSize: 30 },
  playerName: { width: '40%', fontSize: 30 },
  buttonCancel: { backgroundColor: '#d40f0f' },
  buttonCancelPressed: { backgroundColor: '#d15b5b' },
  buttonValidate: { backgroundColor: '#2196F3' },
  buttonValidatePressed: { backgroundColor: '#6fbaf7' },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 5, width: 100 },
  textBtn: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 20 },
});
