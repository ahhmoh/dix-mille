import { useTheme } from '@/hooks/use-theme';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

const theme = useTheme();

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
  idle: { backgroundColor: theme.background, borderColor: theme.primary },
  idleActive: { backgroundColor: theme.primary, borderColor: theme.background },
  pressed: { backgroundColor: theme.secondary, borderColor: theme.primary },
  btnMultiplicator: { flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderRadius: 20 },
  text: { fontSize: 40 },
  textIdle: { color: theme.primary },
  textActive: { color: theme.background },
});
