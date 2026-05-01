import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ModalResetGameProps {
  visible: boolean;
  onValidateModalCompleteReset: () => void;
  onValidateModalPartialReset: () => void;
  onCloseModal: () => void;
}

export const ModalResetGame = ({
  visible,
  onValidateModalCompleteReset,
  onValidateModalPartialReset,
  onCloseModal,
}: ModalResetGameProps) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Réinitialiser la partie ?</Text>

          <View style={styles.buttonColumn}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={onCloseModal}
            >
              <Text style={styles.btnTextStyle}>Non</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonValidatePressed : styles.buttonValidate]}
              onPress={onValidateModalPartialReset}
            >
              <Text style={styles.btnTextStyle}>En gardant les joueur.euses</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonValidatePressed : styles.buttonValidate]}
              onPress={onValidateModalCompleteReset}
            >
              <Text style={styles.btnTextStyle}>Complètement</Text>
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
  buttonColumn: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 5 },
  buttonCancel: { backgroundColor: '#e01422' },
  buttonValidate: { backgroundColor: '#2196F3' },
  buttonValidatePressed: { backgroundColor: '#69b5f4' },
  btnTextStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center', fontSize: 25 },
});
