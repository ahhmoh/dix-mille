import { Player } from '@/components/player/player';
import { TopPlayers } from '../end-of-game/top-players';
import { Score } from './scores';

export class ScoreService {
  public addPlayer(players: Player[], name: string): Player[] {
    if (!name || name.length === 0) {
      return players;
    } else if (players.find((player) => player.name === name)) {
      return players;
    }

    players.push({ name: name, scores: [], turnCount: 0 });
    return players;
  }

  /**
   * Returns a copy of the player array without the player to remove
   * @param players player list to remove from
   * @param toRemove player to remove
   * @returns a copy of the player list without the removed player
   */
  public removePlayer(players: Player[], toRemove: Player): Player[] {
    return players.filter((p) => p.name !== toRemove.name);
  }

  public saveScore(player: Player, toSave: number): Score {
    if (toSave <= 0) {
      throw new Error('Score cannot be negative to be saved');
    } else if (!player) {
      throw new Error('Player does not exist in player list');
    }

    const lastScore = this.getLastValidScore(player);

    const newScore: number = !lastScore ? toSave : lastScore.value + toSave;

    const score = { value: newScore, misses: 0, isCanceled: false };
    player.scores.push(score);

    return score;
  }

  public removeScore(score: Score, player: Player): Score {
    const index = player.scores.findIndex((s) => s === score);

    if (index === -1) {
      throw new Error('Score is not saved for this player');
    }

    player.scores.splice(index, 1);

    return score;
  }

  public removeLastScore(player: Player): Score | undefined {
    return player.scores.pop();
  }

  public addMissToPlayer(player: Player): Score | undefined {
    if (player.scores.length === 0) {
      return undefined;
    }

    const currentScore = this.getLastValidScore(player);

    if (!currentScore) {
      return undefined;
    }

    currentScore.misses += 1;

    return currentScore;
  }

  public removeMissFromScore(score: Score): Score {
    if (score.misses === 0) {
      return score;
    }

    score.misses -= 1;

    return score;
  }

  public getLastValidScore(player: Player): Score | undefined {
    return [...player.scores].reverse().find((score) => this.isScoreValid(score));
  }

  private isScoreValid(score: Score): boolean {
    return score && score.misses < 3 && !score.isCanceled;
  }

  public resetAllPlayers(players: Player[]): Player[] {
    for (let i = 0; i < players.length; i++) {
      const reseted = this.resetPlayer(players[i]);
      players[i] = reseted;
    }

    return players;
  }

  public resetPlayer(player: Player): Player {
    player.scores = [];
    player.turnCount = 0;
    return player;
  }

  public playerAboutToWin(players: Player[], valueToWin: number): Player | undefined {
    let winnerTentative: Player | undefined = undefined;
    let bestScoreYet: number | undefined = undefined;
    let bestTurnCountYet: number = Number.MAX_SAFE_INTEGER;

    for (const player of players) {
      const score = this.getLastValidScore(player);

      if (!score || score.value < valueToWin) {
        continue;
      } else if (
        score &&
        score.value >= valueToWin &&
        (!bestScoreYet ||
          score.value > bestScoreYet ||
          (score.value === bestScoreYet && player.turnCount < bestTurnCountYet))
      ) {
        bestScoreYet = score.value;
        bestTurnCountYet = player.turnCount;
        winnerTentative = player;
      }
    }

    return winnerTentative;
  }

  public getTopPlayers(players: Player[]): TopPlayers {
    if (players.length < 3) {
      throw new Error('Players must at least be 3 to find top players');
    }

    const ordered = this.sortPlayersByBestPerformance(players);

    return { first: ordered[0], second: ordered[1], third: ordered[2] };
  }

  public getTopPlayer(players: Player[]): Player {
    if (!players || players.length === 0) {
      throw new Error('Player list must not be empty');
    }

    const ordered = this.sortPlayersByBestPerformance(players);
    return ordered[0];
  }

  private sortPlayersByBestPerformance(players: Player[]): Player[] {
    return [...players].sort((p1, p2) => {
      const lastP1Score = this.getLastValidScore(p1)?.value ?? 0;
      const lastP2Score = this.getLastValidScore(p2)?.value ?? 0;
      return lastP2Score - lastP1Score || p1.turnCount - p2.turnCount;
    });
  }

  public findValidScoresWithSameValue(playerToExclude: Player, value: number, players: Player[]): Score[] {
    const found = [];

    for (const p of players) {
      if (playerToExclude.name === p.name) {
        continue;
      }

      for (const score of p.scores) {
        if (score.value === value && this.isScoreValid(score)) {
          found.push(score);
        }
      }
    }

    return found;
  }
}

export const scoreService = new ScoreService();
