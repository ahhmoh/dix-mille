import { StyleSheet, Text, View } from 'react-native';

import { ButtonAddPlayer } from '@/components/add-player/btn-add-player';
import { ModalEndOfGame } from '@/components/end-of-game/modal-end-of-game';
import { ButtonHistory } from '@/components/history/btn-history';
import { historyMapperService } from '@/components/history/history-mapper.service';
import { ModalHistory } from '@/components/history/modal-history';
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
  const [isRulesModalVisible, setIsRulesModalVisible] = useState(false);

  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>(undefined);
  const [scoreModificationCommands, setScoreModificationCommands] = useState<Command[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
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
  const [keyboardScoreWritten, setKeyboardScoresWritten] = useState<number[]>([]);

  const resetKeyboardState = () => {
    setKeyboardScoresWritten([]);
    setErrorMessage(undefined);
  };

  const onBtnScoreClicked = (value: number) => {
    const lastScoreWritten = keyboardScoreWritten.at(-1);

    let toDisplay = lastScoreWritten ? parseInt(String(lastScoreWritten) + value) : value;
    setKeyboardScoresWritten([...keyboardScoreWritten, toDisplay]);
  };

  const onBtnRollbackClicked = () => {
    if (keyboardScoreWritten.length !== 0) {
      keyboardScoreWritten.pop();
      setKeyboardScoresWritten([...keyboardScoreWritten]);
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

    resetKeyboardState();
    passTurnToNextPlayer(playerListUpdated);
  };

  const onBtnValidatePressed = () => {
    if (!currentPlayer) {
      return;
    }

    const toAdd = keyboardScoreWritten.at(-1) ?? 0;

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

    resetKeyboardState();
    passTurnToNextPlayer(playerListUpdated);
  };
  //#endregion

  //#region rollback
  const [isRollbackModalVisible, setIsRollbackModalVisible] = useState(false);

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
          <ScoreDisplayer score={keyboardScoreWritten.at(-1) ?? 0} />
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>

        <View style={styles.keyboardZone}>
          <Keyboard
            onBtnScorePressed={onBtnScoreClicked}
            onBtnRollbackPressed={onBtnRollbackClicked}
            onBtnErasePressed={onBtnEraseClicked}
            onBtnFailedPressed={onBtnFailedPressed}
            onBtnValidatePressed={onBtnValidatePressed}
          />
        </View>

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
    flex: 0.3,
    paddingLeft: 60,
    paddingRight: 60,
  },
  errorMessage: {
    height: 10,
    alignSelf: 'center',
    color: 'red',
  },
  keyboardZone: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
});
