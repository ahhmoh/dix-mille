export interface Scores {
    [player: string]: PlayerScores;
}

export interface PlayerScores {
    name: string;
    scores: ScoreSaved[];
}

export interface ScoreSaved {
    value: number;
    misses: number;
}