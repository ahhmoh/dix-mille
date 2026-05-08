import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/theme';

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
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  btnMultiplicator: {
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
