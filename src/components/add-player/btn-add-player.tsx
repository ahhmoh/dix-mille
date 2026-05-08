import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/theme';
import { ModalAddPlayer } from './modal-add-player';

type ButtonAddPlayerProps = { onPlayerAdded: (playerName: string) => void; playerNames: string[] };

export function ButtonAddPlayer({ onPlayerAdded, playerNames }: ButtonAddPlayerProps) {
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
      <Pressable
        onPress={onOpenModalPressed}
        style={({ pressed }) => [styles.btn, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
      >
        <Ionicons
          name='person-add'
          size={40}
          color={colors.primary}
        />
      </Pressable>

      <ModalAddPlayer
        visible={modalVisible}
        playerNames={playerNames}
        onValidateModal={onModalValidated}
        onCloseModal={onModalClosed}
      />
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
