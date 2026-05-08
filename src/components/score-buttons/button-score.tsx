import { Die } from '@/constants/dice-values';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonScoreProps = { die?: Die; onPressCommand?: any };

export function ButtonScore({ die, onPressCommand }: ButtonScoreProps) {
  return (
    <Pressable
      onPress={() => onPressCommand(die)}
      style={({ pressed }) => [styles.btnScore, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Text style={styles.text}>{die?.alphanumeric}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  btnScore: {
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
