import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../constants/theme';

type ButtonBankScoreProps = { onPressCommand?: any; style?: StyleProp<ViewStyle> };

export function ButtonBankScore({ onPressCommand, style }: ButtonBankScoreProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, pressed ? styles.backgroundPressed : styles.backgroundIdle, style]}
    >
      <Ionicons
        name='checkmark-sharp'
        size={50}
        color={colors.primary}
      />
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
});
