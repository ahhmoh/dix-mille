import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

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
        color={colors.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  button: {
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
