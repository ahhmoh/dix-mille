import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Player } from '../player/player';
import { Score } from './scores';
import { scoreService } from './scores.service';

type ScorePreviewProps = { currentlyPlaying?: Player; onClick: () => void };

export function ScorePreview({ currentlyPlaying, onClick }: ScorePreviewProps) {
  const lastValidScore = currentlyPlaying ? scoreService.getLastValidScore(currentlyPlaying) : ({} as Score);

  return (
    <View style={styles.container}>
      {currentlyPlaying ? (
        <View style={styles.row}>
          <View style={styles.previewZone}>
            <Text
              numberOfLines={1}
              style={[styles.previewText, styles.name]}
            >
              {currentlyPlaying?.name}
            </Text>
            <Text style={[styles.previewText, styles.score]}>{lastValidScore?.value || 0}</Text>
            <Text style={[styles.previewText, styles.misses]}>{'|'.repeat(lastValidScore?.misses ?? 0)}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.btnInfo, pressed && styles.btnInfoPressed]}
            onPress={() => onClick()}
          >
            <Ionicons
              name='ellipsis-horizontal'
              size={24}
              color='black'
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.row}>
          <Text style={styles.messageNoPlayer}>Ajoute un.e joueur.euse OH !</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  previewZone: { flex: 6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  previewText: { fontSize: 30 },
  name: { flex: 5, textAlign: 'center' },
  score: { flex: 3, textAlign: 'right' },
  misses: { flex: 1, textAlign: 'center' },
  btnInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  btnInfoPressed: { backgroundColor: 'rgb(210, 230, 255)' },
  messageNoPlayer: { fontSize: 20 },
});
