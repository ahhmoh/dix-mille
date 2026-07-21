import { StyleSheet, Text, View } from 'react-native';

import { ButtonAddPlayer } from '@/components/add-player/btn-add-player';
import { ModalEndOfGame } from '@/components/end-of-game/modal-end-of-game';
import { ButtonHistory } from '@/components/history/btn-history';
import { historyMapperService } from '@/components/history/history-mapper.service';
import { ModalHistory } from '@/components/history/modal-history';
import { ButtonType } from '@/components/keyboard/button-type.enum';
import { Keyboard } from '@/components/keyboard/keyboard';
import { ButtonResetGame } from '@/components/reset-game/btn-reset-game';
import { ModalRollback } from '@/components/rollback/modal-rollback';
import { ButtonRules } from '@/components/rules/btn-rules';
import { initialRules } from '@/components/rules/initial-rules';
import { ModalRules } from '@/components/rules/modal-rules';
import { Rules } from '@/components/rules/rules';
import { AddScoreWithScoreCancelCommand } from '@/components/scores/commands/add-score-with-score-cancel.command';
import { Command } from '@/components/scores/commands/command';
import { ListScores } from '@/components/scores/list-scores';
import { scoreService } from '@/components/scores/scores.service';
import { ThemedView } from '@/components/themed-view';
import { turnService } from '@/components/turns/turn.service';
import { ValidScoreValidator } from '@/components/validators/valid-score.validator';
import { ValidatorField, validatorService } from '@/components/validators/validator.service';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Player } from '../components/player/player';
import { ScoreDisplayer } from '../components/score-displayer/score-displayer';
import { AddMissCommand } from '../components/scores/commands/add-miss.command';
import { AddScoreCommand } from '../components/scores/commands/add-score.command';

const theme = useTheme();

export default function PlayPage() {
  const [rules, setRules] = useState<Rules>(initialRules);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(undefined);

  const [scoresFromPreviousPlayer, setScoresFromPreviousPlayer] = useState<number[]>([]);
  const [scoreModificationCommands, setScoreModificationCommands] = useState<Command[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isRollbackModalVisible, setIsRollbackModalVisible] = useState(false);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);
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

  //#region keyboard
  const [lastBtnPressed, setLastBtnPressed] = useState<ButtonType | undefined>();
  const [keyboardScores, setKeyboardScores] = useState<number[]>([]);
  const [keyboardScoreWritten, setKeyboardScoresWritten] = useState<number[]>([]);
  const [scoreDisplayed, setScoreDisplayed] = useState<number | undefined>();

  const resetKeyboardState = () => {
    setLastBtnPressed(undefined);
    setKeyboardScores([]);
    setKeyboardScoresWritten([]);
    setScoreDisplayed(0);

    setErrorMessage(undefined);
  };

  const onBtnScoreClicked = (value: number) => {
    if (lastBtnPressed === ButtonType.EQUAL || lastBtnPressed === ButtonType.PREVIOUS_SCORE) {
      setKeyboardScores([...keyboardScores, 0]);
      setKeyboardScoresWritten([value]);
      setScoreDisplayed(value);
    } else {
      const lastScoreWritten = keyboardScoreWritten.at(-1);

      let toDisplay = lastScoreWritten ? parseInt(String(lastScoreWritten) + value) : value;
      setKeyboardScoresWritten([...keyboardScoreWritten, toDisplay]);
      setScoreDisplayed(toDisplay);
    }

    setLastBtnPressed(ButtonType.SCORE);
  };

  const onBtnAddClicked = () => {
    if (keyboardScoreWritten.length !== 0) {
      addScores();
    }

    setLastBtnPressed(ButtonType.ADD);
  };

  const onBtnEqualClicked = () => {
    if (keyboardScoreWritten.length !== 0) {
      addScores();
    }

    setLastBtnPressed(ButtonType.EQUAL);
  };

  const addScores = () => {
    const lastScore = keyboardScores.at(-1) ?? 0;
    const total = lastScore + (keyboardScoreWritten.at(-1) ?? 0);

    setKeyboardScores([...keyboardScores, total]);
    setKeyboardScoresWritten([]);
    setScoreDisplayed(total);

    return total;
  };

  const onBtnRollbackClicked = () => {
    if (keyboardScoreWritten.length !== 0) {
      keyboardScoreWritten.pop();
      setKeyboardScoresWritten([...keyboardScoreWritten]);
      setScoreDisplayed(keyboardScoreWritten.at(-1));
    } else if (keyboardScores.length !== 0) {
      keyboardScores.pop();
      setKeyboardScores([...keyboardScores]);
      setKeyboardScoresWritten([]);
      setScoreDisplayed(keyboardScores.at(-1));
    } else {
      rollbackToPreviousPlayer();
    }
  };

  const onBtnEraseClicked = () => {
    resetKeyboardState();
  };

  const onBtnFailedPressed = () => {
    if (!currentPlayer) {
      return;
    }

    const command = new AddMissCommand(currentPlayer, scoreService, turnService);
    command.execute();
    setScoreModificationCommands([...scoreModificationCommands, command]);
    setCurrentPlayer({ ...currentPlayer });
    const playerListUpdated = updatePlayerList(currentPlayer);

    setScoresFromPreviousPlayer([...scoresFromPreviousPlayer, 0]);
    resetKeyboardState();
    passTurnToNextPlayer(playerListUpdated);
  };

  const onBtnValidatePressed = () => {
    if (!currentPlayer) {
      return;
    }

    const toAdd = (keyboardScoreWritten.length !== 0 ? addScores() : keyboardScores.at(-1)) ?? 0;

    const field: ValidatorField<number> = {
      value: toAdd,
      validator: ValidScoreValidator,
      error: null,
    };
    validatorService.validate([field]);

    if (field.error) {
      setErrorMessage(field.error.message);
      return;
    }

    const command = rules.saveScoreCancelsOthers.value
      ? new AddScoreWithScoreCancelCommand(currentPlayer, toAdd, scoreService, turnService, playerList)
      : new AddScoreCommand(currentPlayer, toAdd, scoreService, turnService);

    command.execute();
    setScoreModificationCommands([...scoreModificationCommands, command]);
    setCurrentPlayer({ ...currentPlayer });
    const playerListUpdated = updatePlayerList(currentPlayer);

    setScoresFromPreviousPlayer([...scoresFromPreviousPlayer, toAdd]);

    resetKeyboardState();
    passTurnToNextPlayer(playerListUpdated);
  };

  const onPreviousScoreBtnClicked = () => {
    const previousScore = scoresFromPreviousPlayer[scoresFromPreviousPlayer.length - 1];

    setLastBtnPressed(ButtonType.PREVIOUS_SCORE);
    setKeyboardScores([previousScore]);
    setKeyboardScoresWritten([]);
    setScoreDisplayed(previousScore);
  };
  //#endregion

  //#region rollback
  const rollbackToPreviousPlayer = () => {
    if (!currentPlayer) {
      return;
    }

    const previousPlayer = turnService.getPreviousPlayer(playerList, currentPlayer);

    if (previousPlayer) {
      setIsRollbackModalVisible(true);
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
    if (!command) {
      return;
    }
    command.undo();
    setScoreModificationCommands([...scoreModificationCommands]);

    scoresFromPreviousPlayer.pop();
    setScoresFromPreviousPlayer([...scoresFromPreviousPlayer]);

    updatePlayerList(previousPlayer);
    setCurrentPlayer(previousPlayer);

    resetKeyboardState();
  };
  //#endregion

  const updatePlayerList = (player: Player): Player[] => {
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

  const passTurnToNextPlayer = (players: Player[]) => {
    if (!currentPlayer) {
      return;
    }

    const nextPlayer = turnService.getNextPlayer(players, currentPlayer);
    if (!nextPlayer) {
      return;
    } else if (nextPlayer.name === scoreService.playerAboutToWin(playerList, rules.valueToWin.value)?.name) {
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

    resetKeyboardState();
  };

  const onResetGameKeepingPlayers = () => {
    setScoreModificationCommands([]);
    const players: Player[] = scoreService.resetAllPlayers(playerList);
    setPlayerList([...players]);
    setCurrentPlayer(undefined);

    resetKeyboardState();

    if (players.length != 0) {
      setCurrentPlayer({ ...players[0] });
    }
  };

  const onRuleModalValidate = (rules: Rules): void => {
    validatorService.validate(Object.values(rules));
    setRules({ ...rules });

    const firstErrorFound = Object.values(rules).find((rule: ValidatorField<any>) => rule.error !== null);

    if (!firstErrorFound) {
      setIsRulesModalVisible(false);
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

          <ButtonHistory
            onPressCommand={() => setIsHistoryModalVisible(true)}
            isDisabled={playerList.length === 0}
          />
          <ModalHistory
            visible={isHistoryModalVisible}
            data={historyMapperService.extractData(playerList)}
            onCloseModal={() => setIsHistoryModalVisible(false)}
          />

          <ButtonResetGame
            onResetCompletely={onResetGameCompletely}
            onResetKeepingPlayers={onResetGameKeepingPlayers}
          />

          <ButtonRules onPressCommand={() => setIsRulesModalVisible(true)} />
          <ModalRules
            visible={isRulesModalVisible}
            onCloseButtonClick={onRuleModalValidate}
            rules={rules}
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
          <ScoreDisplayer
            score={scoreDisplayed}
            onPreviousBtnClicked={onPreviousScoreBtnClicked}
            isBtnPreviousScoreDisabled={(() => {
              const previousScore = scoresFromPreviousPlayer[scoresFromPreviousPlayer.length - 1];
              return !previousScore || scoreDisplayed === previousScore;
            })()}
          />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>

        <Keyboard
          onBtnScorePressed={onBtnScoreClicked}
          onBtnAddPressed={onBtnAddClicked}
          onBtnEqualPressed={onBtnEqualClicked}
          onBtnRollbackPressed={onBtnRollbackClicked}
          onBtnErasePressed={onBtnEraseClicked}
          onBtnFailedPressed={onBtnFailedPressed}
          onBtnValidatePressed={onBtnValidatePressed}
        />

        <ModalEndOfGame
          visible={isEndOfGameModalVisible}
          players={playerList}
          onCloseModal={() => setIsEndOfGameModalVisible(false)}
        />

        {currentPlayer && (
          <ModalRollback
            visible={isRollbackModalVisible}
            lastPlayerName={turnService.getPreviousPlayer(playerList, currentPlayer)?.name}
            onCloseModal={onRollbackModalCancel}
            onValidateModal={onRollbackModalValidate}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.background,
  },
  safeArea: {
    flex: 1,
    gap: Spacing.three,
    maxWidth: 400,
  },
  topBtnRow: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  previewZone: {
    flex: 1,
  },
  tentativeScoreZone: {
    flex: 0.5,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
  },
});
