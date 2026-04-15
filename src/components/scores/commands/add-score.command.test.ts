import { Player } from '../../player/player';
import { turnService } from '../../turns/turn.service';
import { scoreService } from '../scores.service';
import { AddScoreCommand } from './add-score.command';

describe('AddScoreCommand', () => {
  it('should throw if value to add is negative', () => {
    const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };

    expect(() => new AddScoreCommand(player, -100, scoreService, turnService)).toThrow();
  });

  describe('execute', () => {
    it('should add score to player', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);

      command.execute();

      const { scores } = player;
      expect(scores.length).toBe(2);
      const scoreAdded = scores[scores.length - 1];
      expect(scoreAdded.value).toBe(200);
      expect(scoreAdded.misses).toBe(0);
    });

    it('should be executed only one time', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);
      command.execute();

      command.execute();

      const { scores } = player;
      expect(scores.length).toBe(2);
    });

    it('should add turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);

      command.execute();

      expect(player.turnCount).toBe(1);
    });
  });

  describe('undo', () => {
    it('should remove score if it is the last one', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);
      command.execute();

      command.undo();

      const { scores } = player;
      expect(scores.length).toBe(1);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
    });

    it('should remove score if other scores have been added', () => {
      const scores = [{ value: 100, misses: 0 }];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);
      command.execute();
      scores.push({ value: 300, misses: 0 });

      command.undo();

      expect(scores.length).toBe(2);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
      expect(scores[1].value).toBe(300);
      expect(scores[1].misses).toBe(0);
    });

    it('should not do anything if not already executed', () => {
      const scores = [{ value: 100, misses: 0 }];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);

      command.undo();

      expect(scores.length).toBe(1);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
    });

    it('should remove turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddScoreCommand(player, 100, scoreService, turnService);
      command.execute();
      expect(player.turnCount).toBe(1);

      command.undo();

      expect(player.turnCount).toBe(0);
    });
  });
});
