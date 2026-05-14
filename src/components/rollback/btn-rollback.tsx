import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonRollbackProps = { onPressCommand?: any; style?: StyleProp<ViewStyle> };

export function ButtonRollback({ onPressCommand, style }: ButtonRollbackProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [
        styles.btnMultiplicator,
        pressed ? styles.backgroundPressed : styles.backgroundIdle,
        style,
      ]}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: colors.primary },
});
