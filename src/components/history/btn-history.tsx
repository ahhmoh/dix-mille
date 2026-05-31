import { useTheme } from '@/hooks/use-theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const theme = useTheme();

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
        color={theme.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  backgroundDisabled: { backgroundColor: theme.secondary },
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
