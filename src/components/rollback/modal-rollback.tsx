import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ModalRollbackProps {
  visible: boolean;
  lastPlayerName?: string;
  onValidateModal: () => void;
  onCloseModal: () => void;
}

export const ModalRollback = ({ visible, lastPlayerName, onValidateModal, onCloseModal }: ModalRollbackProps) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Annuler la dernière action de {lastPlayerName} ?</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCloseModal}
            >
              <Text style={styles.textStyle}>Non</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonValidate]}
              onPress={onValidateModal}
            >
              <Text style={styles.textStyle}>Oui</Text>
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
  button: { width: 60, borderRadius: 20, padding: 10, margin: 5 },
  buttonClose: { backgroundColor: '#e01422' },
  buttonValidate: { backgroundColor: '#2196F3' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center' },
});
