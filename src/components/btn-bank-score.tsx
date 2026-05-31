import { useTheme } from '@/hooks/use-theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type ButtonBankScoreProps = { onPressCommand?: any; style?: StyleProp<ViewStyle> };
const theme = useTheme();

export function ButtonBankScore({ onPressCommand, style }: ButtonBankScoreProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle, style]}
    >
      <Ionicons
        name='checkmark-sharp'
        size={50}
        color={theme.primary}
      />
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
});
