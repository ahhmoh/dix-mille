import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Player } from '../player/player';
import { Score } from './scores';
import { scoreService } from './scores.service';

type ScorePreviewProps = { currentlyPlaying?: Player; onClick: () => void };

export function ScorePreview({ currentlyPlaying, onClick }: ScorePreviewProps) {
  const lastValidScore = currentlyPlaying ? scoreService.getLastValidScore(currentlyPlaying) : ({} as Score);

  return (
    <View>
      <Pressable onPress={() => onClick()}>
        {currentlyPlaying ? (
          <Text style={styles.score}>
            {currentlyPlaying?.name} {lastValidScore?.value || 0} {'|'.repeat(lastValidScore?.misses ?? 0)}
          </Text>
        ) : (
          <Text style={styles.messageNoPlayer}>Ajouter un.e joueur.euse OH !</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 200 },
  score: { fontSize: 40 },
  messageNoPlayer: { fontSize: 20 },
  notPlaying: { color: 'black' },
  currentlyPlaying: { color: '#ab8514' },
});
