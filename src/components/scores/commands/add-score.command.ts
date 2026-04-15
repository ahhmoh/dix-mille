import { Player } from '@/components/player/player';
import { TurnService } from '@/components/turns/turn.service';
import { Score } from '../scores';
import { ScoreService } from '../scores.service';
import { Command } from './command';

export class AddScoreCommand implements Command {
  private player: Player;
  private toSave: number;
  private scoreService: ScoreService;
  private turnService: TurnService;
  private scoreAdded: Score | undefined = undefined;
  private isExecuted: boolean = false;

  constructor(player: Player, toSave: number, scoreService: ScoreService, turnService: TurnService) {
    if (toSave <= 0) {
      throw new Error("Score cannot be negative to be saved");
    }

    this.player = player;
    this.toSave = toSave;
    this.scoreService = scoreService;
    this.turnService = turnService;
  }

  public execute = () => {
    if (this.isExecuted) {
      return;
    }
    this.isExecuted = true;
    this.scoreService.saveScore(this.player, this.toSave);
    this.turnService.addTurnPlayed(this.player);

    const { scores } = this.player;
    this.scoreAdded = scores[scores.length - 1];
  };

  public undo = () => {
    if (!this.isExecuted || !this.scoreAdded) {
      return;
    }
    this.isExecuted = false;
    this.scoreService.removeScore(this.scoreAdded, this.player);
    this.turnService.removeTurnPlayed(this.player);
    this.scoreAdded = undefined;
  };
}
