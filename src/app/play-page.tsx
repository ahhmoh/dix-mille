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
import { PlayerScores, Scores } from '@/components/scores/scores';
import { ScoreList } from '@/components/scores/score-list';
import { scoreModifierService } from '@/services/scores-modifier.service';

const scores: Scores = {
    "ant": { name: "ant", scores: [] },
    "apo": { name: "apo", scores: [] },
    "motio": { name: "motio", scores: [] },
    "motieo": { name: "motieo", scores: [] },
    "motizfefo": { name: "motizfefo", scores: [] },
    "motizefo": { name: "motizefo", scores: [] },
};
scoreModifierService.addPlayer(scores, "ant");

export default function PlayPage() {
    const multiplicatorBaseValue = 1;

    const [currentPlayer, setCurrentPlayer] = useState("ant");
    const [scoreTentative, setScoreTentative] = useState(0);
    const [multiplicator, setMultiplicator] = useState(multiplicatorBaseValue);
    const [scoresAdded, setScoresAdded] = useState([] as number[]);
    const [scoreList, setScoreList] = useState(scores);

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

        const updatedScores = scoreModifierService.saveScore(scoreList, currentPlayer, scoreTentative);
        setScoreList(updatedScores);
        setScoreTentative(0);
    };

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScoreList playerScores={scoreList} />

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
