import { Player } from "@/components/player/player";

export class ScoreModifierService {
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

        const newScore: number = player?.scores.length === 0
            ? toSave
            : player.scores[player.scores.length - 1].value + toSave;

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

        const currentScore = player.scores[player.scores.length - 1];

        if (currentScore.misses >= 2) {
            return players;
        }

        currentScore.misses += 1;

        return players;
    }
}

export const scoreModifierService = new ScoreModifierService();