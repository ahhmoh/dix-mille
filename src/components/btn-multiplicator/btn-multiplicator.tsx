import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonMultiplicatorProps = { multiplicator: number; onPressCommand?: any };

export function ButtonMultiplicator({ multiplicator, onPressCommand }: ButtonMultiplicatorProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.btnMultiplicator, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Text style={styles.text}>x{multiplicator}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: 'white' },
  backgroundPressed: { backgroundColor: 'rgb(210, 230, 255)' },
  btnMultiplicator: {
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
