import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ModalResetGame } from './modal-reset-game';

type ButtonResetGameProps = { onResetKeepingPlayers: () => void; onResetCompletely: () => void };

export function ButtonResetGame({ onResetKeepingPlayers, onResetCompletely }: ButtonResetGameProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const onOpenModalPressed = () => {
    setModalVisible(true);
  };

  const onModalValidatedKeepingPlayersReset = () => {
    onResetKeepingPlayers();
    setModalVisible(false);
  };

  const onModalValidatedCompleteReset = () => {
    onResetCompletely();
    setModalVisible(false);
  };

  const onModalClosed = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <ModalResetGame
        visible={modalVisible}
        onValidateModalCompleteReset={onModalValidatedCompleteReset}
        onValidateModalPartialReset={onModalValidatedKeepingPlayersReset}
        onCloseModal={onModalClosed}
      />
      <Pressable
        onPress={onOpenModalPressed}
        style={({ pressed }) => [styles.btn, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
      >
        <Ionicons
          name='sync'
          size={40}
          color='black'
        />
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
