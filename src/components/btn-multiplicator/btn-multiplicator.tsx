import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ButtonMultiplicatorProps = {
  multiplicator: number;
  isActive: boolean;
  onPressCommand?: any;
  style?: StyleProp<ViewStyle>;
};

export function ButtonMultiplicator({ multiplicator, isActive, onPressCommand, style }: ButtonMultiplicatorProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [
        styles.btnMultiplicator,
        isActive ? styles.idleActive : styles.idle,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, isActive ? styles.textActive : styles.textIdle]}>x{multiplicator}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  idle: { backgroundColor: colors.background, borderColor: colors.primary },
  idleActive: { backgroundColor: colors.primary, borderColor: colors.background },
  pressed: { backgroundColor: colors.secondary, borderColor: colors.primary },
  btnMultiplicator: { flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderRadius: 20 },
  text: { fontSize: 40 },
  textIdle: { color: colors.primary },
  textActive: { color: colors.background },
});
