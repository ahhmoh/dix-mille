import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../constants/theme';

type ButtonFailedProps = { onPressCommand?: any; style?: StyleProp<ViewStyle> };

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
  backgroundIdle: { backgroundColor: colors.background },
  backgroundPressed: { backgroundColor: colors.secondary },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  text: { fontSize: 40, color: colors.primary },
});
