import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonRulesProps = { onPressCommand?: () => void; style?: StyleProp<ViewStyle> };

export function ButtonRules({ onPressCommand, style }: ButtonRulesProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle, style]}
    >
      <Ionicons
        name='settings-sharp'
        size={40}
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
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
