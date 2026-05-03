import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type ButtonRollbackProps = { onPressCommand?: any };

export function ButtonRollback({ onPressCommand }: ButtonRollbackProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.btnMultiplicator, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Ionicons
        name='arrow-undo'
        size={40}
        color='black'
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: 'white' },
  backgroundPressed: { backgroundColor: 'rgb(210, 230, 255)' },
  btnMultiplicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  text: { fontSize: 40 },
});
