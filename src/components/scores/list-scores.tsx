import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';
import { Player } from '../player/player';
import { ModalDeletePlayer } from './delete-player/modal-delete-player';
import { scoreService } from './scores.service';

type ListScoresProps = { players: Player[]; currentlyPlaying?: Player; onDeleteUser: (player: Player) => void };

export function ListScores({ players, currentlyPlaying, onDeleteUser }: ListScoresProps) {
  const data = (players && Object.values(players)) || [];

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
    setPlayerToDelete(undefined);
  };

  const renderScore = ({ item }: { item: Player }) => {
    const playerName = item?.name ?? '';
    const lastScore = scoreService.getLastValidScore(item);
    const scoreValue = lastScore?.value || 0;
    const misses = lastScore?.misses || 0;
    const isCurrentlyPlaying = item.name === currentlyPlaying?.name;

    return (
      <View style={styles.rowPlayer}>
        <Ionicons
          name='caret-forward-outline'
          color={colors.primary}
          size={30}
          style={[styles.iconCurrentlyPlaying, item.name !== currentlyPlaying?.name && styles.iconHidden]}
        />
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

        <View style={styles.deleteSection}>
          {players.length !== 1 && (
            <Pressable
              onPress={() => onDeleteBtnPressed(item)}
              style={({ pressed }) => (pressed ? [styles.btnDelete, styles.btnDeletePressed] : styles.btnDelete)}
            >
              <Text style={styles.btnDeleteText}>X</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return players?.length !== 0 ? (
    <View style={styles.list}>
      <FlatList
        data={data}
        renderItem={renderScore}
        keyExtractor={(item) => 'score-item-' + item.name}
        scrollEnabled={true}
      />
      {playerToDelete && (
        <ModalDeletePlayer
          isVisible={isDeleteModalVisible}
          player={playerToDelete}
          onCancel={onDeleteModalCancel}
          onValidate={onDeleteModalValidate}
        />
      )}
    </View>
  ) : (
    <View style={styles.rowNoPlayer}>
      <Text style={styles.messageNoPlayer}>Ajoute un.e joueur.euse OH !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  rowPlayer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  btnDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  btnDeletePressed: { backgroundColor: colors.secondary },
  btnDeleteText: { fontSize: 25, color: colors.primary },
  iconCurrentlyPlaying: { flex: 0.4 },
  iconHidden: { visibility: 'hidden' },
  playerName: { flex: 2, fontSize: 25 },
  score: { flex: 1, fontSize: 25 },
  misses: { flex: 0.3, fontSize: 25 },
  deleteSection: { flex: 0.4 },
  notPlaying: { color: colors.primary },
  currentlyPlaying: { color: colors.primary },

  rowNoPlayer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  messageNoPlayer: { fontSize: 20, color: colors.primary, fontWeight: 'bold' },
});
