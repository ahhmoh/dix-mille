import { useTheme } from '@/hooks/use-theme';
import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type ButtonWithIconProps = {
  children: ReactNode;
  onPressCommand?: any;
  style?: StyleProp<ViewStyle>;
  stylePressed?: StyleProp<ViewStyle>;
};

const theme = useTheme();

export function ButtonWithIcon({ children, onPressCommand, style, stylePressed }: ButtonWithIconProps) {
  return (
    <Pressable
      onPress={onPressCommand}
      style={({ pressed }) => [styles.button, style, pressed && styles.backgroundPressed, pressed && stylePressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.primary,
    borderRadius: 20,
    backgroundColor: theme.background,
  },
  backgroundPressed: { backgroundColor: theme.secondary },
});
