import { Scores } from "@/components/scores/scores";

export class ScoreModifierService {
    public addPlayer(scores: Scores, name: string): void {
        if(!name || name.length === 0) {
            return;
        }

        scores.scoresForPlayers.push({ name, scores: [] });
    }

    public removePlayer(scores: Scores, index: number): void {
        if (index < 0 || scores.scoresForPlayers.length - 1 < index) {
            return;
        }

        scores.scoresForPlayers.splice(index, 1);
    }

    public saveScore(scores: Scores, indexPlayer: number, toSave: number): void {
        if (indexPlayer < 0
            || scores.scoresForPlayers.length - 1 < indexPlayer
            || toSave <= 0) {
            return;
        }

        const playerScore = scores.scoresForPlayers[indexPlayer];
        const newScore: number = playerScore.scores.length === 0
            ? toSave
            : playerScore.scores[playerScore.scores.length - 1].value + toSave;

        playerScore.scores.push({ value: newScore, misses: 0 });
    }

    public addMissToPlayer(scores: Scores, indexPlayer: number) {
        if (indexPlayer < 0
            || scores.scoresForPlayers.length - 1 < indexPlayer) {
            return;
        }

        const playerScores = scores.scoresForPlayers[indexPlayer].scores;

        if (playerScores.length === 0) {
            return;
        }

        const currentScore = playerScores[playerScores.length - 1];

        if(currentScore.misses >= 2) {
            return;
        }

        currentScore.misses += 1;
    }
}

export const scoreModifierService = new ScoreModifierService();