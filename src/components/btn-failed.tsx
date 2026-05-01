import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonFailedProps = { onPressCommand?: any };

export function ButtonFailed({ onPressCommand }: ButtonFailedProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Text style={styles.text}>Failed</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: '#bc141a' },
  backgroundPressed: { backgroundColor: '#b66d6f' },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  text: { fontSize: 40, color: 'white' },
});
