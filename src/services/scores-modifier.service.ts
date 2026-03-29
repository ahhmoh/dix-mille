import { Scores } from "@/components/scores/scores";

export class ScoreModifierService {
    public addPlayer(scores: Scores, name: string): Scores {
        if (!name || name.length === 0) {
            return { ...scores };
        }

        return { ...scores, [name]: { name, scores: [] } };
    }

    public removePlayer(scores: Scores, name: string) {
        delete scores[name];
    }

    public saveScore(scores: Scores, name: string, toSave: number): Scores {
        if (toSave <= 0
            || Object.keys(scores).findIndex(player => player === name) === -1) {
            return { ...scores };
        }

        const playerScore = scores[name];
        const newScore: number = playerScore.scores.length === 0
            ? toSave
            : playerScore.scores[playerScore.scores.length - 1].value + toSave;

        playerScore.scores.push({ value: newScore, misses: 0 });

        return { ...scores, [name]: { ...playerScore } };
    }

    public addMissToPlayer(scores: Scores, name: string): Scores {
        const playerScores = scores[name].scores;

        if (playerScores.length === 0) {
            return { ...scores };
        }

        const currentScore = playerScores[playerScores.length - 1];

        if (currentScore.misses >= 2) {
            return { ...scores };
        }

        currentScore.misses += 1;

        return {
            ...scores,
            [name]: {
                ...scores[name],
                scores: [...playerScores]
            }
        };
    }
}

export const scoreModifierService = new ScoreModifierService();