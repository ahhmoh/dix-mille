import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonBankScoreProps = { onPressCommand?: any };

export function ButtonBankScore({ onPressCommand }: ButtonBankScoreProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Text style={styles.text}>OK</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: '#06402B' },
  backgroundPressed: { backgroundColor: '#17d590' },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  text: { fontSize: 40, color: 'white' },
});
