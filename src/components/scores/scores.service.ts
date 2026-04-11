import { Player } from "@/components/player/player";
import { Score } from "./scores";

export class ScoreService {
    public addPlayer(players: Player[], name: string): Player[] {
        if (!name || name.length === 0) {
            return players;
        }

        players.push({ name: name, scores: [] });
        return players;
    }

    public removePlayer(players: Player[], name: string): Player[] {
        return players.filter(player => player.name !== name)
    }

    public saveScore(players: Player[], name: string, toSave: number): Player[] {
        if (toSave <= 0) {
            throw new Error("Score cannot be negative to be saved");
        }

        const player = players.find(player => player.name === name);

        if (!player) {
            throw new Error("Player does not exist in player list");
        }

        const lastScore = this.getLastValidScore(player);

        const newScore: number = !lastScore
            ? toSave
            : lastScore.value + toSave;

        player.scores.push({ value: newScore, misses: 0 });

        return players;
    }

    public addMissToPlayer(players: Player[], name: string): Player[] {
        const player = players.find(p => p.name === name);

        if (!player) {
            throw new Error("Player does not exist in player list");
        }

        if (player.scores.length === 0) {
            return players;
        }

        const currentScore = this.getLastValidScore(player);

        if (!currentScore) {
            return players;
        }

        currentScore.misses += 1;

        return players;
    }

    public getLastValidScore(player: Player): Score | undefined {
        return player.scores.toReversed().find(score => score.misses < 3);
    }
}

export const scoreService = new ScoreService();