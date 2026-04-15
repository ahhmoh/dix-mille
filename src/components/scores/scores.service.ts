import { Player } from "@/components/player/player";
import { Score } from "./scores";

export class ScoreService {
  public addPlayer(players: Player[], name: string): Player[] {
    if (!name || name.length === 0) {
      return players;
    } else if (players.find(player => player.name === name)) {
      return players;
    }

    players.push({ name: name, scores: [], turnCount: 0 });
    return players;
  }

  public removePlayer(players: Player[], name: string): Player[] {
    return players.filter(player => player.name !== name)
  }

  public saveScore(player: Player, toSave: number): Score {
    if (toSave <= 0) {
      throw new Error("Score cannot be negative to be saved");
    } else if (!player) {
      throw new Error("Player does not exist in player list");
    }

    const lastScore = this.getLastValidScore(player);

    const newScore: number = !lastScore
      ? toSave
      : lastScore.value + toSave;

    const score = { value: newScore, misses: 0 };
    player.scores.push(score);

    return score;
  }

  public removeScore(score: Score, player: Player): Score {
    const index = player.scores.findIndex(s => s === score);

    if (index === -1) {
      throw new Error("Score is not saved for this player")
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
    return player.scores.toReversed().find(score => score.misses < 3);
  }
}

export const scoreService = new ScoreService();