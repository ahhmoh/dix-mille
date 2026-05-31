import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const theme = useTheme();

interface ModalAddPlayerProps {
  visible: boolean;
  playerNames: string[];
  onValidateModal: (name: string) => void;
  onCloseModal: () => void;
}

const placeholders: Set<string> = new Set([
  'Carmina Burrata',
  'Buse le Clerc',
  'Pepe Ronin',
  'Boit un pastix',
  'Démone Hallebarde',
  'Ozy Oskour',
  'Eddy de Repetto',
  'Philippe Ballerine',
  'Thomas de Porcherie',
  'Cléoplâtre',
  'Méta Miaou',
  'Capitaine Clochet',
  'La fée crochette',
  'Bobard fête',
  'Chwinamax',
]);

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
    setPlaceholder(getRandomPlaceHolder());
  };

  const onCancel = () => {
    setPlaceholder(getRandomPlaceHolder());
    setNewPlayer('');
    onCloseModal();
  };

  const getRandomPlaceHolder = () => {
    const rng = Math.floor(Math.random() * placeholders.size);

    let i = 0;
    for (const placeholder of placeholders.values()) {
      if (rng === i) {
        return placeholder;
      }

      i++;
    }

    return '';
  };

  const [placeholder, setPlaceholder] = useState<string>(getRandomPlaceHolder());

  const computeBtnValidateStyle = (isPlayerValid: boolean, isPressed: boolean) => {
    if (!isPlayerValid) {
      return [styles.button, styles.buttonValidateDisabled];
    } else if (isPressed) {
      return [styles.button, styles.buttonValidatePressed];
    } else {
      return [styles.button, styles.buttonValidate];
    }
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
            placeholder={placeholder}
            keyboardType='default'
            style={styles.inputText}
          />
          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed ? styles.buttonClosePressed : styles.buttonClose]}
              onPress={onCancel}
            >
              <Text style={styles.textStyle}>Annuler</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => computeBtnValidateStyle(isNewPlayerValid, pressed)}
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
    flex: 0.2,
    width: '70%',
    margin: 20,
    backgroundColor: theme.background,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { flex: 1, marginBottom: 15, textAlign: 'center', color: theme.primary, fontWeight: 'bold' },
  inputText: {
    flex: 0.7,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 10,
    color: theme.primary,
    padding: 5,
  },
  buttonRow: { flex: 1.3, flexDirection: 'row', justifyContent: 'center' },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: { backgroundColor: theme.primary },
  buttonClosePressed: { backgroundColor: theme.secondary },
  buttonValidate: { backgroundColor: theme.primary },
  buttonValidateDisabled: { backgroundColor: theme.secondary },
  buttonValidatePressed: { backgroundColor: theme.secondary },
});
