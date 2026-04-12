import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ModalAddPlayer } from './modal-add-player';

type ButtonAddPlayerProps = { onPlayerAdded: (playerName: string) => void; playerNames: string[] };

export function ButtonAddPlayer({ onPlayerAdded, playerNames }: ButtonAddPlayerProps) {
  const content = '+';

  const [modalVisible, setModalVisible] = useState(false);

  const onOpenModalPressed = () => {
    setModalVisible(true);
  };

  const onModalValidated = (playerName: string) => {
    onPlayerAdded(playerName);
    setModalVisible(false);
  };

  const onModalClosed = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <ModalAddPlayer
        visible={modalVisible}
        playerNames={playerNames}
        onValidateModal={onModalValidated}
        onCloseModal={onModalClosed}
      />
      <Pressable
        onPress={onOpenModalPressed}
        style={({ pressed }) => [styles.btn, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
      >
        <Text style={styles.text}>{content}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: 'white' },
  backgroundPressed: { backgroundColor: 'rgb(210, 230, 255)' },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    margin: 7,
  },
  text: { fontSize: 40 },
});
