import { Player } from '../player/player';
import { Score } from '../scores/scores';
import { HeaderCell } from './header-cell.interface';

export class HistoryMapperService {
  public extractData = (players: Player[] | undefined): Array<Array<HeaderCell | Score | undefined>> => {
    if (!players) {
      return [];
    }

    const header = players.map((p): HeaderCell => ({ headerValue: p.name }));
    const rows: Array<Array<HeaderCell | Score | undefined>> = [header];

    let isFinishedLookingForScores = false;
    let indexScore = 0;

    while (!isFinishedLookingForScores) {
      let tentativeRow: Array<Score | undefined> = [];

      players.forEach((player) => {
        const score = indexScore < player.scores.length ? player.scores[indexScore] : undefined;
        tentativeRow.push(score);
      });

      if (tentativeRow.some((score) => !!score)) {
        rows.push(tentativeRow);
        indexScore++;
      } else {
        isFinishedLookingForScores = true;
      }
    }

    return rows;
  };
}

export const historyMapperService = new HistoryMapperService();
