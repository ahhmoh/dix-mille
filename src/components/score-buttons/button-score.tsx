import { useTheme } from '@/hooks/use-theme';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

const theme = useTheme();

type ButtonScoreProps = {
  value: number;
  onPressCommand: (value: number) => void;
  style: StyleProp<ViewStyle>;
};

export function ButtonScore({ value, onPressCommand, style }: ButtonScoreProps) {
  return (
    <Pressable
      onPress={() => onPressCommand(value)}
      style={({ pressed }) => [styles.btnScore, pressed ? styles.backgroundPressed : styles.backgroundIdle, style]}
    >
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  btnScore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: theme.primary },
});
