import { Score } from "../scores/scores";

export interface Player {
  /**
   * Player name. Unique amongst all players
   */
  name: string;
  scores: Score[];
  turnCount: number;
}