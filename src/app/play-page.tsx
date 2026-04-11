import { Platform, StyleSheet, View } from 'react-native';

import { ButtonMultiplicator } from '@/components/btn-multiplicator/btn-multiplicator';
import { ButtonScore } from '@/components/score-buttons/button-score';
import { ScoreDisplayer } from '@/components/score-displayer/score-displayer';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dice, DiceName, Die } from '@/constants/dice-values';
import { ButtonRollback } from '@/components/btn-rollback/btn-rollback';
import { ButtonBankScore } from '@/components/btn-bank-score';
import { ScoreList } from '@/components/scores/score-list';
import { scoreService } from '@/components/scores/scores.service';
import { ButtonFailed } from '@/components/btn-failed';
import { turnService } from '@/components/turns/turn.service';
import { playersMock } from '@/components/player/players.mock';
import { ButtonAddPlayer } from '@/components/btn-add-player/btn-add-player';


export default function PlayPage() {
    const multiplicatorBaseValue = 1;

    const [currentPlayer, setCurrentPlayer] = useState(playersMock[0]);
    const [scoreTentative, setScoreTentative] = useState(0);
    const [multiplicator, setMultiplicator] = useState(multiplicatorBaseValue);
    const [scoresAdded, setScoresAdded] = useState([] as number[]);
    const [playerList, setPlayerList] = useState(playersMock);

    const onMultiplicatorPressed = () => {
        if (multiplicator < 6) {
            setMultiplicator(multiplicator + 1);
        }
    };

    const onBtnScorePressed = (die: Die) => {
        const atLeast3Dice = multiplicator >= 3;
        let toAdd: number = 0;

        if (atLeast3Dice) {
            toAdd = die.valueThreeTimes;
            const multiplicatorPower = multiplicator - 3;
            toAdd = toAdd * Math.pow(2, multiplicatorPower);
        } else {
            toAdd = die.valueBase;
        }

        if (toAdd += 0) {
            setScoresAdded([...scoresAdded, toAdd]);
            setScoreTentative(scoreTentative + toAdd);
            setMultiplicator(multiplicatorBaseValue);
        }

    };

    const onBtnRollbackPressed = () => {
        if (multiplicator > multiplicatorBaseValue) {
            setMultiplicator(multiplicatorBaseValue);
        } else if (scoresAdded.length != 0) {
            const toRemove = scoresAdded[scoresAdded.length - 1];

            setScoresAdded(scoresAdded.slice(0, scoresAdded.length - 1));
            setScoreTentative(scoreTentative - toRemove);
        }
    };

    const onBtnValidatePressed = () => {
        if (scoreTentative === 0) {
            return;
        }

        scoreService.saveScore(currentPlayer, scoreTentative);

        setPlayerList([...playerList]);
        setScoreTentative(0);
        setScoresAdded([]);
        passTurnToNextPlayer();
    };

    const onBtnFailedPressed = () => {
        scoreService.addMissToPlayer(currentPlayer);

        setPlayerList([...playerList]);
        setScoreTentative(0);
        setScoresAdded([]);
        passTurnToNextPlayer();
    };

    const passTurnToNextPlayer = () => {
        const nextPlayer = turnService.getNextPlayer(playerList, currentPlayer.name);
        setCurrentPlayer(nextPlayer);
    };

    const onAddPlayer = () => {
        scoreService.addPlayer(playerList, "yo");
        setPlayerList([...playerList]);
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ButtonAddPlayer onPressCommand={onAddPlayer} />
                <ScoreList playerScores={playerList} currentlyPlaying={currentPlayer} />

                <ScoreDisplayer score={scoreTentative} />

                <View style={styles.btnZone}>
                    <View style={styles.btnRow}>
                        <ButtonScore die={Dice[DiceName.ONE]} onPressCommand={onBtnScorePressed} />
                        <ButtonScore die={Dice[DiceName.TWO]} onPressCommand={onBtnScorePressed} />
                        <ButtonScore die={Dice[DiceName.THREE]} onPressCommand={onBtnScorePressed} />
                    </View>
                    <View style={styles.btnRow}>
                        <ButtonScore die={Dice[DiceName.FOUR]} onPressCommand={onBtnScorePressed} />
                        <ButtonScore die={Dice[DiceName.FIVE]} onPressCommand={onBtnScorePressed} />
                        <ButtonScore die={Dice[DiceName.SIX]} onPressCommand={onBtnScorePressed} />
                    </View>
                    <View style={styles.btnRow}>
                        <ButtonMultiplicator multiplicator={multiplicator} onPressCommand={onMultiplicatorPressed} />
                        <ButtonRollback onPressCommand={onBtnRollbackPressed} />
                        <ButtonBankScore onPressCommand={onBtnValidatePressed} />
                    </View>
                    <View style={styles.btnRow}>
                        <ButtonFailed onPressCommand={onBtnFailedPressed} />
                    </View>
                </View>
                {Platform.OS === 'web' && <WebBadge />}
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        alignItems: 'center',
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
    },
    btnZone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'red',
        width: '80%'
    },
    btnRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    }
});
