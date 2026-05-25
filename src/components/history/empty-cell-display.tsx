import { View, ViewStyle } from 'react-native';

interface EmptyCellDisplayProps {
  style?: ViewStyle;
}

export const EmptyCellDisplay = ({ style }: EmptyCellDisplayProps) => {
  return <View style={style}></View>;
};
