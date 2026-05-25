import { Player } from '@/components/player/player';
import { TurnService } from '@/components/turns/turn.service';
import { Score } from '../scores';
import { ScoreService } from '../scores.service';
import { AddScoreCommand } from './add-score.command';

export class AddScoreWithScoreCancelCommand extends AddScoreCommand {
  private scoreCanceled: Score[] = [];

  constructor(
    player: Player,
    toSave: number,
    scoreService: ScoreService,
    turnService: TurnService,
    private readonly players: Player[]
  ) {
    super(player, toSave, scoreService, turnService);
  }

  public execute() {
    if (this.isExecuted) {
      return;
    }

    super.execute();

    if (!this.scoreAdded) {
      return;
    }

    this.scoreCanceled = this.scoreService.findValidScoresWithSameValue(
      this.player,
      this.scoreAdded?.value,
      this.players
    );
    this.scoreCanceled.forEach((score) => (score.isCanceled = true));
  }

  public undo() {
    if (!this.isExecuted) {
      return;
    }

    super.undo();

    this.scoreCanceled.forEach((score) => (score.isCanceled = false));
    this.scoreCanceled = [];
  }
}
