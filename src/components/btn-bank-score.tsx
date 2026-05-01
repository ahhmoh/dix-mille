import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

type ButtonBankScoreProps = { onPressCommand?: any };

export function ButtonBankScore({ onPressCommand }: ButtonBankScoreProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle]}
    >
      <Ionicons
        name='checkmark-sharp'
        size={60}
        color='black'
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: '#17d590' },
  backgroundPressed: { backgroundColor: '#96d5be' },
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
