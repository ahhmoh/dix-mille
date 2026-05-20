import { StyleSheet, View } from 'react-native';

import { ButtonAddPlayer } from '@/components/add-player/btn-add-player';
import { ModalEndOfGame } from '@/components/end-of-game/modal-end-of-game';
import { Command } from '@/components/scores/commands/command';
import { ListScores } from '@/components/scores/list-scores';
import { scoreService } from '@/components/scores/scores.service';
import { ThemedView } from '@/components/themed-view';
import { turnService } from '@/components/turns/turn.service';
import { Dice, DiceName, Die } from '@/constants/dice-values';
import { colors, Spacing } from '@/constants/theme';
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

export default function PlayPage() {
  const multiplicatorBaseValue = 3;
  const valueToWin = 100;

  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(undefined);
  const [scoreTentative, setScoreTentative] = useState(0);
  const [multiplicator, setMultiplicator] = useState(multiplicatorBaseValue);
  const [isMultiplicatorActive, setIsMultiplicatorActive] = useState(false);
  const [scoresAddedForTurn, setScoresAddedForTurn] = useState<number[]>([]);
  const [scoreModificationCommands, setScoreModificationCommands] = useState<Command[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [isRollbackModalVisible, setIsRollbackModalVisible] = useState(false);
  const [isEndOfGameModalVisible, setIsEndOfGameModalVisible] = useState(false);

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

  const resetForNewTurn = () => {
    setScoreTentative(0);
    setMultiplicator(multiplicatorBaseValue);
    setIsMultiplicatorActive(false);
    setScoresAddedForTurn([]);
  };

  const onMultiplicatorPressed = () => {
    if (!currentPlayer) {
      return;
    } else if (!isMultiplicatorActive) {
      setIsMultiplicatorActive(true);
    } else if (multiplicator < 6) {
      setMultiplicator(multiplicator + 1);
    }
  };

  const onBtnScorePressed = (die: Die) => {
    if (!currentPlayer) {
      return;
    }

    let toAdd: number = 0;

    if (isMultiplicatorActive) {
      toAdd = die.valueThreeTimes;
      const multiplicatorPower = multiplicator - multiplicatorBaseValue;
      toAdd = toAdd * Math.pow(2, multiplicatorPower);
    } else {
      toAdd = die.valueBase;
    }

    if ((toAdd += 0)) {
      setScoresAddedForTurn([...scoresAddedForTurn, toAdd]);
      setScoreTentative(scoreTentative + toAdd);
      setMultiplicator(multiplicatorBaseValue);
      setIsMultiplicatorActive(false);
    }
  };

  //#region rollback
  const onBtnRollbackPressed = () => {
    if (!currentPlayer) {
      return;
    }

    const previousPlayer = turnService.getPreviousPlayer(playerList, currentPlayer);

    if (multiplicator === multiplicatorBaseValue && scoresAddedForTurn.length === 0 && previousPlayer) {
      setIsRollbackModalVisible(true);
    } else if (isMultiplicatorActive) {
      setIsMultiplicatorActive(false);
      setMultiplicator(multiplicatorBaseValue);
    } else if (scoresAddedForTurn.length !== 0) {
      const toRemove = scoresAddedForTurn[scoresAddedForTurn.length - 1];

      setScoresAddedForTurn(scoresAddedForTurn.slice(0, scoresAddedForTurn.length - 1));
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

    const command = scoreModificationCommands.pop();
    setScoreModificationCommands([...scoreModificationCommands]);

    if (!command) {
      return;
    }
    command.undo();

    keepPlayerListUpdated(previousPlayer);
    setCurrentPlayer(previousPlayer);

    resetForNewTurn();
  };
  //#endregion

  const keepPlayerListUpdated = (player: Player): Player[] => {
    if (!player) {
      return playerList;
    }

    const indexPlayer = playerList.findIndex((p) => p.name === player.name);
    if (indexPlayer === -1) {
      return playerList;
    }

    playerList[indexPlayer] = player;
    const updatedList = [...playerList];
    setPlayerList([...playerList]);
    return updatedList;
  };

  const onBtnValidatePressed = () => {
    if (scoreTentative === 0 || !currentPlayer) {
      return;
    }

    const command = new AddScoreCommand(currentPlayer, scoreTentative, scoreService, turnService);
    command.execute();
    setScoreModificationCommands([...scoreModificationCommands, command]);
    setCurrentPlayer({ ...currentPlayer });
    const playerListUpdated = keepPlayerListUpdated(currentPlayer);

    resetForNewTurn();
    passTurnToNextPlayer(playerListUpdated);
  };

  const onBtnFailedPressed = () => {
    if (!currentPlayer) {
      return;
    }

    const command = new AddMissCommand(currentPlayer, scoreService, turnService);
    command.execute();
    setScoreModificationCommands([...scoreModificationCommands, command]);
    setCurrentPlayer({ ...currentPlayer });
    const playerListUpdated = keepPlayerListUpdated(currentPlayer);

    resetForNewTurn();
    passTurnToNextPlayer(playerListUpdated);
  };

  const passTurnToNextPlayer = (players: Player[]) => {
    if (!currentPlayer) {
      return;
    }

    const nextPlayer = turnService.getNextPlayer(players, currentPlayer);
    if (!nextPlayer) {
      return;
    } else if (nextPlayer.name === scoreService.playerAboutToWin(playerList, valueToWin)?.name) {
      setIsEndOfGameModalVisible(true);
    } else {
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
    setScoreModificationCommands([]);
    setPlayerList([]);
    setCurrentPlayer(undefined);

    resetForNewTurn();
  };

  const onResetGameKeepingPlayers = () => {
    setScoreModificationCommands([]);
    const players: Player[] = scoreService.resetAllPlayers(playerList);
    setPlayerList([...players]);
    setCurrentPlayer(undefined);

    resetForNewTurn();

    if (players.length != 0) {
      setCurrentPlayer({ ...players[0] });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ModalEndOfGame
          visible={isEndOfGameModalVisible}
          players={playerList}
          onCloseModal={() => setIsEndOfGameModalVisible(false)}
        />
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
          <ListScores
            players={playerList}
            currentlyPlaying={currentPlayer}
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
              style={styles.btn}
            />
            <ButtonScore
              die={Dice[DiceName.TWO]}
              onPressCommand={onBtnScorePressed}
              style={styles.btn}
            />
            <ButtonScore
              die={Dice[DiceName.THREE]}
              onPressCommand={onBtnScorePressed}
              style={styles.btn}
            />
          </View>
          <View style={styles.btnRow}>
            <ButtonScore
              die={Dice[DiceName.FOUR]}
              onPressCommand={onBtnScorePressed}
              style={styles.btn}
            />
            <ButtonScore
              die={Dice[DiceName.FIVE]}
              onPressCommand={onBtnScorePressed}
              style={styles.btn}
            />
            <ButtonScore
              die={Dice[DiceName.SIX]}
              onPressCommand={onBtnScorePressed}
              style={styles.btn}
            />
          </View>
          <View style={styles.btnRow}>
            <ButtonMultiplicator
              multiplicator={multiplicator}
              isActive={isMultiplicatorActive}
              onPressCommand={onMultiplicatorPressed}
              style={styles.btn}
            />
            <ButtonRollback
              onPressCommand={onBtnRollbackPressed}
              style={styles.btn}
            />

            {currentPlayer && (
              <ModalRollback
                visible={isRollbackModalVisible}
                lastPlayerName={turnService.getPreviousPlayer(playerList, currentPlayer)?.name}
                onCloseModal={onRollbackModalCancel}
                onValidateModal={onRollbackModalValidate}
              />
            )}
          </View>
          <View style={styles.btnRow}>
            <ButtonFailed
              onPressCommand={onBtnFailedPressed}
              style={styles.btn}
            />
            <ButtonBankScore
              onPressCommand={onBtnValidatePressed}
              style={styles.btn}
            />
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: colors.background },
  safeArea: { flex: 1, gap: Spacing.three, maxWidth: 400 },
  topBtnRow: { flex: 0.4, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
  previewZone: { flex: 1 },
  tentativeScoreZone: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  btnZone: { flex: 1, justifyContent: 'center', paddingRight: 76, paddingLeft: 76, paddingBottom: 50 },
  btnRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' },
  btn: { margin: 2 },
});
