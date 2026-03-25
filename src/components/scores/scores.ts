export class Scores {
    private _scoresForPlayers: PlayerScores[] = [];
    public get scoresForPlayers() {
        return this._scoresForPlayers;
    }
}

export interface PlayerScores {
    name: string;
    scores: ScoreSaved[];
}

export interface ScoreSaved {
    value: number;
    misses: number;
}