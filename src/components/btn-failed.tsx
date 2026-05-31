import { useTheme } from '@/hooks/use-theme';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type ButtonFailedProps = { onPressCommand?: any; style?: StyleProp<ViewStyle> };
const theme = useTheme();

export function ButtonFailed({ onPressCommand, style }: ButtonFailedProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle, style]}
    >
      <Text style={styles.text}>raté :)</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backgroundIdle: { backgroundColor: theme.background },
  backgroundPressed: { backgroundColor: theme.secondary },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: theme.primary },
});
