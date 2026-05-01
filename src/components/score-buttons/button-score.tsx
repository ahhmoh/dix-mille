import { Die } from '@/constants/dice-values';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

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
  backgroundIdle: { backgroundColor: 'white' },
  backgroundPressed: { backgroundColor: 'rgb(210, 230, 255)' },
  btnScore: {
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
