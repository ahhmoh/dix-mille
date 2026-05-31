import { useTheme } from '@/hooks/use-theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ModalResetGame } from './modal-reset-game';

const theme = useTheme();

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
          size={47}
          color={theme.primary}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 10,
  },
  text: { fontSize: 40 },
});
