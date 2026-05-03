import { Platform, StyleSheet, View } from 'react-native';

import { ButtonAddPlayer } from '@/components/add-player/btn-add-player';
import { scoreService } from '@/components/scores/scores.service';
import { ThemedView } from '@/components/themed-view';
import { turnService } from '@/components/turns/turn.service';
import { WebBadge } from '@/components/web-badge';
import { Dice, DiceName, Die } from '@/constants/dice-values';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonBankScore } from '../components/btn-bank-score';
import { ButtonFailed } from '../components/btn-failed';
import { ButtonMultiplicator } from '../components/btn-multiplicator/btn-multiplicator';
import { Player } from '../components/player/player';
import { ButtonResetGame } from '../components/reset-game/btn-reset-game';
import { ButtonRollback } from '../components/rollback/btn-rollback';
import { ModalRollback } from '../components/rollback/modal-rollback';
import { ButtonScore } from '../components/score-buttons/button-score';
import { ScoreDisplayer } from '../components/score-displayer/score-displayer';
import { AddMissCommand } from '../components/scores/commands/add-miss.command';
import { AddScoreCommand } from '../components/scores/commands/add-score.command';
import { CommandHistory } from '../components/scores/commands/command-history';
import { ModalScore } from '../components/scores/modal-score';
import { ScorePreview } from '../components/scores/score-preview';

export default function PlayPage() {
  const multiplicatorBaseValue = 1;

  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(undefined);
  const [scoreTentative, setScoreTentative] = useState(0);
  const [multiplicator, setMultiplicator] = useState(multiplicatorBaseValue);
  const [scoresAdded, setScoresAdded] = useState<number[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [isRollbackModalVisible, setIsRollbackModalVisible] = useState(false);
  const [isScoreModalVisible, setIsScoreModalVisible] = useState(false);

  const onScorePreviewClick = () => {
    setIsScoreModalVisible(true);
  };

  const onScoreModalClose = () => {
    setIsScoreModalVisible(false);
  };

  const onDeleteUser = (player: Player) => {
    if (currentPlayer?.name === player.name) {
      const nextPlayer = turnService.getNextPlayer(playerList, player);

      if (nextPlayer) {
        setCurrentPlayer({ ...nextPlayer });
      }
    }

    const listWithoutPlayer = scoreService.removePlayer(playerList, player);
    setPlayerList([...listWithoutPlayer]);
  };

  const commandHistory = new CommandHistory();

  const onMultiplicatorPressed = () => {
    if (!currentPlayer) {
      return;
    } else if (multiplicator < 6) {
      setMultiplicator(multiplicator + 1);
    }
  };

  const onBtnScorePressed = (die: Die) => {
    if (!currentPlayer) {
      return;
    }

    const atLeast3Dice = multiplicator >= 3;
    let toAdd: number = 0;

    if (atLeast3Dice) {
      toAdd = die.valueThreeTimes;
      const multiplicatorPower = multiplicator - 3;
      toAdd = toAdd * Math.pow(2, multiplicatorPower);
    } else {
      toAdd = die.valueBase;
    }

    if ((toAdd += 0)) {
      setScoresAdded([...scoresAdded, toAdd]);
      setScoreTentative(scoreTentative + toAdd);
      setMultiplicator(multiplicatorBaseValue);
    }
  };

  const onBtnRollbackPressed = () => {
    if (!currentPlayer) {
      return;
    }

    const previousPlayer = turnService.getPreviousPlayer(playerList, currentPlayer);
    if (multiplicator === multiplicatorBaseValue && scoresAdded.length === 0 && previousPlayer) {
      setIsRollbackModalVisible(true);
    } else if (multiplicator > multiplicatorBaseValue) {
      setMultiplicator(multiplicatorBaseValue);
    } else if (scoresAdded.length !== 0) {
      const toRemove = scoresAdded[scoresAdded.length - 1];

      setScoresAdded(scoresAdded.slice(0, scoresAdded.length - 1));
      setScoreTentative(scoreTentative - toRemove);
    }
  };

  const onRollbackModalCancel = () => {
    setIsRollbackModalVisible(false);
  };

  const onRollbackModalValidate = () => {
    setIsRollbackModalVisible(false);

    if (!currentPlayer) {
      return;
    }

    const previousPlayer = turnService.getPreviousPlayer(playerList, currentPlayer);
    if (!previousPlayer) {
      return;
    }

    const command = commandHistory.pop();
    if (!command) {
      return;
    }
    command.undo();

    setPlayerList([...playerList]);
    setCurrentPlayer(previousPlayer);
    setMultiplicator(multiplicatorBaseValue);
    setScoreTentative(0);
  };

  const onBtnValidatePressed = () => {
    if (scoreTentative === 0 || !currentPlayer) {
      return;
    }

    const command = new AddScoreCommand(currentPlayer, scoreTentative, scoreService, turnService);
    command.execute();
    commandHistory.push(command);

    setPlayerList([...playerList]);
    setScoreTentative(0);
    setScoresAdded([]);
    passTurnToNextPlayer();
  };

  const onBtnFailedPressed = () => {
    if (!currentPlayer) {
      return;
    }

    const command = new AddMissCommand(currentPlayer, scoreService, turnService);
    command.execute();
    commandHistory.push(command);

    setPlayerList([...playerList]);
    setScoreTentative(0);
    setScoresAdded([]);
    passTurnToNextPlayer();
  };

  const passTurnToNextPlayer = () => {
    if (!currentPlayer) {
      return;
    }

    const nextPlayer = turnService.getNextPlayer(playerList, currentPlayer);
    if (nextPlayer) {
      setCurrentPlayer({ ...nextPlayer });
    }
  };

  const onAddPlayer = (playerName: string) => {
    const players = scoreService.addPlayer(playerList, playerName);
    setPlayerList([...players]);

    if (!currentPlayer && players.length != 0) {
      setCurrentPlayer(players[0]);
    }
  };

  const onResetGameCompletely = () => {
    commandHistory.reset();
    setPlayerList([]);
    setScoreTentative(0);
    setScoresAdded([]);
    setCurrentPlayer(undefined);
  };

  const onResetGameKeepingPlayers = () => {
    commandHistory.reset();
    const players: Player[] = scoreService.resetAllPlayers(playerList);
    setPlayerList([...players]);
    setScoreTentative(0);
    setScoresAdded([]);

    if (players.length != 0) {
      setCurrentPlayer({ ...players[0] });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBtnRow}>
          <ButtonAddPlayer
            onPlayerAdded={onAddPlayer}
            playerNames={playerList.map((p) => p.name)}
          />

          <ButtonResetGame
            onResetCompletely={onResetGameCompletely}
            onResetKeepingPlayers={onResetGameKeepingPlayers}
          />
        </View>

        <View style={styles.previewZone}>
          <ScorePreview
            currentlyPlaying={currentPlayer}
            onClick={onScorePreviewClick}
          />
          <ModalScore
            isVisible={isScoreModalVisible}
            playerScores={playerList}
            currentlyPlaying={currentPlayer}
            onCloseModal={onScoreModalClose}
            onDeleteUser={onDeleteUser}
          />
        </View>

        <View style={styles.tentativeScoreZone}>
          <ScoreDisplayer score={scoreTentative} />
        </View>

        <View style={styles.btnZone}>
          <View style={styles.btnRow}>
            <ButtonScore
              die={Dice[DiceName.ONE]}
              onPressCommand={onBtnScorePressed}
            />
            <ButtonScore
              die={Dice[DiceName.TWO]}
              onPressCommand={onBtnScorePressed}
            />
            <ButtonScore
              die={Dice[DiceName.THREE]}
              onPressCommand={onBtnScorePressed}
            />
          </View>
          <View style={styles.btnRow}>
            <ButtonScore
              die={Dice[DiceName.FOUR]}
              onPressCommand={onBtnScorePressed}
            />
            <ButtonScore
              die={Dice[DiceName.FIVE]}
              onPressCommand={onBtnScorePressed}
            />
            <ButtonScore
              die={Dice[DiceName.SIX]}
              onPressCommand={onBtnScorePressed}
            />
          </View>
          <View style={styles.btnRow}>
            <ButtonMultiplicator
              multiplicator={multiplicator}
              onPressCommand={onMultiplicatorPressed}
            />
            <ButtonRollback onPressCommand={onBtnRollbackPressed} />

            {currentPlayer && (
              <ModalRollback
                visible={isRollbackModalVisible}
                lastPlayerName={turnService.getPreviousPlayer(playerList, currentPlayer)?.name}
                onCloseModal={onRollbackModalCancel}
                onValidateModal={onRollbackModalValidate}
              />
            )}

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
  container: { flex: 1, justifyContent: 'center', flexDirection: 'row' },
  safeArea: { flex: 1, gap: Spacing.three, maxWidth: MaxContentWidth },
  topBtnRow: { flex: 1, flexDirection: 'row', justifyContent: 'center' },
  previewZone: { flex: 1 },
  tentativeScoreZone: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnZone: { flex: 4, justifyContent: 'center', paddingRight: 60, paddingLeft: 60 },
  btnRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' },
});
