import { useTheme } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const theme = useTheme();

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
        color={theme.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  btnMultiplicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
  },
});
