import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlayerScores, Scores } from './scores';

type ScoreListProps = {
    playerScores?: Scores;
};

export function ScoreList({ playerScores }: ScoreListProps) {
    const data = playerScores && Object.values(playerScores) || [];

    const renderScore = ({ item }: { item: PlayerScores }) => {
        const playerName = item?.name ?? "";
        const lastScore = item.scores[item.scores.length - 1] ?? {};
        return <Text key={"score-" + playerName} style={styles.score}>{playerName} {lastScore?.value} {"|".repeat(lastScore?.misses)}</Text>;
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
