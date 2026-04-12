import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface ModalAddPlayerProps {
  visible: boolean;
  playerNames: string[];
  onValidateModal: (name: string) => void;
  onCloseModal: () => void;
}

export const ModalAddPlayer = ({ visible, playerNames, onValidateModal, onCloseModal }: ModalAddPlayerProps) => {
  const [newPlayer, setNewPlayer] = useState<string>('');

  const isNewPlayerValid = newPlayer !== '' && !playerNames.find((name) => name === newPlayer);

  const onPlayerNameChange = (name: string) => {
    setNewPlayer(name);
  };

  const onValidatePlayer = () => {
    if (!isNewPlayerValid) {
      return;
    }

    onValidateModal(newPlayer);
    setNewPlayer('');
  };

  const onCancel = () => {
    setNewPlayer('');
    onCloseModal();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Nouveau·elle joueureuse</Text>
          <TextInput
            onChangeText={onPlayerNameChange}
            value={newPlayer}
            placeholder='Carmina Burrata'
            keyboardType='numeric'
            style={styles.inputText}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCancel}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
            <Pressable
              style={[styles.button, isNewPlayerValid ? styles.buttonValidate : styles.buttonValidateDisabled]}
              onPress={onValidatePlayer}
              disabled={!isNewPlayerValid}
            >
              <Text style={styles.textStyle}>Ajouter</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  buttonRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 5 },
  buttonClose: { backgroundColor: '#e01422' },
  buttonValidate: { backgroundColor: '#2196F3' },
  buttonValidateDisabled: { backgroundColor: '#cbe2f6' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center' },
  inputText: { marginBottom: 15, textAlign: 'center', width: '100%' },
});
