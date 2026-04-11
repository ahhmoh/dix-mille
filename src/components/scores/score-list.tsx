import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Player } from '../player/player';

type ScoreListProps = {
    playerScores?: Player[];
};

export function ScoreList({ playerScores }: ScoreListProps) {
    const data = playerScores && Object.values(playerScores) || [];

    const renderScore = ({ item }: { item: Player }) => {
        const playerName = item?.name ?? "";
        const lastScore = item.scores[item.scores.length - 1] ?? {};
        const scoreValue = lastScore?.value || 0;
        return <Text key={"score-" + playerName} style={styles.score}>{playerName} {scoreValue} {"|".repeat(lastScore?.misses)}</Text>;
    };

    return (
        <View style={styles.stepRow}>
            <FlatList
                data={data}
                renderItem={renderScore}
                keyExtractor={item => "score-item-" + item.name}
                scrollEnabled={true}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    stepRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    score: {
        fontSize: 40
    }
});
