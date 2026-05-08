import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';
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
          color={colors.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  text: { fontSize: 40 },
});
