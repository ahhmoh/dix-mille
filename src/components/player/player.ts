import { Score } from "../scores/scores";

export interface Player {
  name: string;
  scores: Score[];
  turnCount: number;
}