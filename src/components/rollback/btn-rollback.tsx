import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

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
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  btnMultiplicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: colors.primary },
});
