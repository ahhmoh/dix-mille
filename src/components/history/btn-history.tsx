import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonHistoryProps = { onPressCommand?: any; isDisabled: boolean; style?: StyleProp<ViewStyle> };

export function ButtonHistory({ onPressCommand, isDisabled, style }: ButtonHistoryProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.backgroundPressed : styles.backgroundIdle,
        isDisabled && styles.backgroundDisabled,
        style,
      ]}
    >
      <FontAwesome
        name='history'
        size={40}
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  backgroundDisabled: { backgroundColor: colors.secondary },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
});
