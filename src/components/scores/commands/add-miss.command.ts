import { Player } from '@/components/player/player';
import { TurnService } from '@/components/turns/turn.service';
import { Score } from '../scores';
import { ScoreService } from '../scores.service';
import { Command } from './command';

export class AddMissCommand implements Command {
  private player: Player;
  private scoreService: ScoreService;
  private turnService: TurnService;
  private scoreModified: Score | undefined = undefined;
  private isExecuted: boolean = false;

  constructor(player: Player, scoreService: ScoreService, turnService: TurnService) {
    this.player = player;
    this.scoreService = scoreService;
    this.turnService = turnService;
  }

  public execute = () => {
    if (this.isExecuted) {
      return;
    }

    this.turnService.addTurnPlayed(this.player);
    this.scoreModified = this.scoreService.addMissToPlayer(this.player);
    this.isExecuted = true;
  };

  public undo = () => {
    if (!this.isExecuted) {
      return;
    }

    this.turnService.removeTurnPlayed(this.player);

    if (!this.scoreModified) {
      return;
    }

    this.scoreService.removeMissFromScore(this.scoreModified);
    this.scoreModified = undefined;
  };
}
