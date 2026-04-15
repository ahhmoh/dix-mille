import { Player } from '../../player/player';
import { turnService } from '../../turns/turn.service';
import { scoreService } from '../scores.service';
import { AddMissCommand } from './add-miss.command';

describe('AddMissCommand', () => {
  describe('execute', () => {
    it('should add miss to player last score', () => {
      const scores = [
        { value: 100, misses: 0 },
        { value: 200, misses: 0 },
      ];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.execute();

      expect(scores.length).toBe(2);
      expect(scores[scores.length - 1].misses).toBe(1);
    });

    it('should add miss to player last valid score only', () => {
      const scores = [
        { value: 100, misses: 0 },
        { value: 200, misses: 3 },
      ];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.execute();

      expect(scores.length).toBe(2);
      expect(scores[0].misses).toBe(1);
    });

    it('should be executed only one time', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);
      command.execute();

      command.execute();

      const { scores } = player;
      expect(scores[scores.length - 1].misses).toBe(1);
    });

    it('should add turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.execute();

      expect(player.turnCount).toBe(1);
    });

    it('should add turn played even if there are no scores', () => {
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.execute();

      expect(player.turnCount).toBe(1);
    });

    it('should add turn played if no valid score available', () => {
      const player: Player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 3 },
          { value: 500, misses: 3 },
        ],
        turnCount: 0,
      };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.execute();

      expect(player.turnCount).toBe(1);
    });
  });

  describe('undo', () => {
    it('should remove miss', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);
      command.execute();

      command.undo();

      const { scores } = player;
      expect(scores[0].misses).toBe(0);
    });

    it('should remove score if other scores have been added', () => {
      const scores = [{ value: 100, misses: 0 }];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);
      command.execute();
      expect(scores[0].misses).toBe(1);
      scores.push({ value: 300, misses: 0 });

      command.undo();

      expect(scores[0].misses).toBe(0);
    });

    it('should not do anything if not already executed', () => {
      const scores = [{ value: 100, misses: 1 }];
      const player: Player = { name: 'ant', scores, turnCount: 1 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.undo();

      expect(scores[0].misses).toBe(1);
    });

    it('should remove turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0 }], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);
      command.execute();
      expect(player.turnCount).toBe(1);

      command.undo();

      expect(player.turnCount).toBe(0);
    });

    it('should remove turn played even if there are no scores', () => {
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };
      const command = new AddMissCommand(player, scoreService, turnService);
      command.execute();
      expect(player.turnCount).toBe(1);

      command.undo();

      expect(player.turnCount).toBe(0);
    });

    it('should not do anything if command not executed', () => {
      const player: Player = { name: 'ant', scores: [], turnCount: 1 };
      const command = new AddMissCommand(player, scoreService, turnService);

      command.undo();

      expect(player.turnCount).toBe(1);
    });
  });
});
