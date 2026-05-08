import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { Player } from '../player/player';
import { ModalDeletePlayer } from './delete-player/modal-delete-player';
import { scoreService } from './scores.service';

type ModalScoreProps = {
  isVisible: boolean;
  playerScores: Player[];
  currentlyPlaying?: Player;
  onCloseModal: () => void;
  onDeleteUser: (player: Player) => void;
};

export function ModalScore({ isVisible, playerScores, currentlyPlaying, onCloseModal, onDeleteUser }: ModalScoreProps) {
  const data = (playerScores && Object.values(playerScores)) || [];

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<Player | undefined>(undefined);

  const onDeleteBtnPressed = (player: Player) => {
    setPlayerToDelete(player);
    setIsDeleteModalVisible(true);
  };

  const onDeleteModalCancel = () => setIsDeleteModalVisible(false);

  const onDeleteModalValidate = (player: Player) => {
    setIsDeleteModalVisible(false);
    onDeleteUser(player);
  };

  const renderScore = ({ item }: { item: Player }) => {
    const playerName = item?.name ?? '';
    const lastScore = scoreService.getLastValidScore(item);
    const scoreValue = lastScore?.value || 0;
    const misses = lastScore?.misses || 0;
    const isCurrentlyPlaying = item.name === currentlyPlaying?.name;

    return (
      <View style={styles.rowPlayer}>
        <Text
          key={'name-' + playerName}
          style={[styles.playerName, isCurrentlyPlaying ? styles.currentlyPlaying : styles.notPlaying]}
          numberOfLines={1}
        >
          {playerName}
        </Text>
        <Text
          key={'score-' + playerName}
          style={[styles.score, isCurrentlyPlaying ? styles.currentlyPlaying : styles.notPlaying]}
        >
          {scoreValue}
        </Text>
        <Text
          key={'misses-' + playerName}
          style={[styles.misses, isCurrentlyPlaying ? styles.currentlyPlaying : styles.notPlaying]}
        >
          {'|'.repeat(misses)}
        </Text>

        {playerScores.length !== 1 && (
          <Pressable
            onPress={() => onDeleteBtnPressed(item)}
            style={({ pressed }) => (pressed ? [styles.btnDelete, styles.btnDeletePressed] : styles.btnDelete)}
          >
            <Text style={styles.btnDeleteText}>X</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Scores</Text>
          <View style={styles.list}>
            <FlatList
              style={styles.list}
              data={data}
              renderItem={renderScore}
              keyExtractor={(item) => 'score-item-' + item.name}
              scrollEnabled={true}
            />
          </View>

          <Pressable
            style={({ pressed }) => [styles.button, pressed ? styles.buttonValidatePressed : styles.buttonValidate]}
            onPress={onCloseModal}
          >
            <Text style={styles.textBtn}>OK</Text>
          </Pressable>

          {playerToDelete && (
            <ModalDeletePlayer
              isVisible={isDeleteModalVisible}
              player={playerToDelete}
              onCancel={onDeleteModalCancel}
              onValidate={onDeleteModalValidate}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: { fontSize: 50 },
  list: { height: 400, width: 250, marginTop: 10 },
  rowPlayer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  btnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  btnDeletePressed: { backgroundColor: colors.secondary },
  btnDeleteText: { fontSize: 30, color: colors.primary },
  playerName: { width: '40%', fontSize: 30 },
  score: { width: '30%', fontSize: 30 },
  misses: { width: '10%', fontSize: 30 },
  notPlaying: { color: colors.primary },
  currentlyPlaying: { color: colors.primary },
  buttonValidate: { backgroundColor: colors.background },
  buttonValidatePressed: { backgroundColor: colors.secondary },
  button: {
    padding: 10,
    elevation: 2,
    margin: 5,
    width: 100,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 20,
  },
  textBtn: { color: colors.primary, fontWeight: 'bold', textAlign: 'center', fontSize: 20 },
});
