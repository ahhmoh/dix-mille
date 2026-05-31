import { useTheme } from '@/hooks/use-theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const theme = useTheme();

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
        color={theme.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
});
