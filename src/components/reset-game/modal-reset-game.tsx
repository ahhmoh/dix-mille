import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

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
              style={({ pressed }) => [styles.button, pressed ? styles.buttonCancelPressed : styles.buttonCancel]}
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
    backgroundColor: colors.background,
    borderRadius: 20,
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonColumn: { flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch' },
  button: { borderRadius: 20, padding: 10, elevation: 2, margin: 5 },
  buttonCancel: { backgroundColor: colors.secondary },
  buttonCancelPressed: { backgroundColor: colors.primary },
  buttonValidate: { backgroundColor: colors.primary },
  buttonValidatePressed: { backgroundColor: colors.secondary },
  btnTextStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center', fontSize: 25 },
});
