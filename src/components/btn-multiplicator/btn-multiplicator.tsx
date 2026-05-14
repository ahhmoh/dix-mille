import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonMultiplicatorProps = { multiplicator: number; onPressCommand?: any; style?: StyleProp<ViewStyle> };

export function ButtonMultiplicator({ multiplicator, onPressCommand, style }: ButtonMultiplicatorProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [
        styles.btnMultiplicator,
        pressed ? styles.backgroundPressed : styles.backgroundIdle,
        style,
      ]}
    >
      <Text style={styles.text}>x{multiplicator}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  btnMultiplicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: colors.primary },
});
