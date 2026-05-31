import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ModalAddPlayer } from './modal-add-player';

type ButtonAddPlayerProps = { onPlayerAdded: (playerName: string) => void; playerNames: string[] };
const theme = useTheme();

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
          color={theme.primary}
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
