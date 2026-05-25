import { StyleProp, Text, TextStyle } from 'react-native';
import { HeaderCell } from './header-cell.interface';

interface HeaderCellDisplayProps {
  headerCell: HeaderCell;
  style?: StyleProp<TextStyle>;
}

export const HeaderCellDisplay = ({ headerCell, style }: HeaderCellDisplayProps) => {
  return (
    <Text
      style={style}
      numberOfLines={1}
    >
      {headerCell.headerValue}
    </Text>
  );
};
