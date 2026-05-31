import { useTheme } from '@/hooks/use-theme';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { isScore, Score } from '../scores/scores';
import { EmptyCellDisplay } from './empty-cell-display';
import { HeaderCellDisplay } from './header-cell-display';
import { HeaderCell, isHeaderCell } from './header-cell.interface';
import { ScoreDisplay } from './score-display';

const theme = useTheme();

interface ModalHistoryProps {
  visible: boolean;
  data: Array<Array<HeaderCell | Score | undefined>>;
  onCloseModal: () => void;
}

export const ModalHistory = ({ visible, data, onCloseModal }: ModalHistoryProps) => {
  const renderRow = ({
    item: row,
    index: indexRow,
  }: {
    item: Array<HeaderCell | Score | undefined>;
    index: number;
  }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: theme.background, gap: 10 }}>
        {row.map((child, indexCol) => {
          const keyCell = `row-${indexRow}-cell-${indexCol}`;

          if (!child) {
            return (
              <EmptyCellDisplay
                key={keyCell}
                style={styles.tableCell}
              />
            );
          } else if (isScore(child)) {
            return (
              <ScoreDisplay
                score={child}
                key={keyCell}
                style={styles.tableCell}
              />
            );
          } else if (isHeaderCell(child)) {
            return (
              <HeaderCellDisplay
                key={keyCell}
                headerCell={child}
                style={[styles.tableCell, styles.headerCell]}
              />
            );
          }
        })}
      </View>
    );
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView
            horizontal={true}
            directionalLockEnabled={false}
          >
            <FlatList
              data={data}
              renderItem={renderRow}
              keyExtractor={(_, index) => 'list-cell-' + index}
              scrollEnabled={true}
              stickyHeaderIndices={[0]}
            />
          </ScrollView>

          <Pressable
            style={({ pressed }) => [styles.button, pressed ? styles.buttonClose : styles.buttonClosePressed]}
            onPress={onCloseModal}
          >
            <Text style={styles.buttonText}>Quitter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: {
    flex: 0.4,
    margin: 20,
    backgroundColor: theme.background,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tableCell: { width: 60, backgroundColor: theme.background, gap: 10 },
  headerCell: { fontWeight: 'bold' },
  button: { borderRadius: 20, padding: 10, margin: 5 },
  buttonClose: { backgroundColor: theme.secondary },
  buttonClosePressed: { backgroundColor: theme.primary },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
});
