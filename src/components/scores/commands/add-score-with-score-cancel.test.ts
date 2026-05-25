import { Player } from '../../player/player';
import { turnService } from '../../turns/turn.service';
import { scoreService } from '../scores.service';
import { AddScoreWithScoreCancelCommand } from './add-score-with-score-cancel.command';

describe('AddScoreWithScoreCancelCommand', () => {
  it('should throw if value to add is negative', () => {
    const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };

    expect(() => new AddScoreWithScoreCancelCommand(player, -100, scoreService, turnService, [player])).toThrow();
  });

  describe('execute', () => {
    it('should add score to player', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);

      command.execute();

      const { scores } = player;
      expect(scores.length).toBe(2);
      const scoreAdded = scores[scores.length - 1];
      expect(scoreAdded.value).toBe(200);
      expect(scoreAdded.misses).toBe(0);
    });

    it('should be executed only one time', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);
      command.execute();

      command.execute();

      const { scores } = player;
      expect(scores.length).toBe(2);
    });

    it('should add turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);

      command.execute();

      expect(player.turnCount).toBe(1);
    });

    describe('if other players have valid score with same value', () => {
      describe('and the score is canceled', () => {
        it("should not change other players' scores", () => {
          const mockPlayer: Player = {
            name: 'mock-player',
            scores: [{ value: 100, misses: 0, isCanceled: false }],
            turnCount: 0,
          };
          const mockPlayerTwo: Player = {
            name: 'mock-player-two',
            scores: [{ value: 200, misses: 0, isCanceled: true }],
            turnCount: 0,
          };
          const mockPlayers = [mockPlayer, mockPlayerTwo];
          const command = new AddScoreWithScoreCancelCommand(mockPlayer, 100, scoreService, turnService, mockPlayers);
          const expectedScore = { ...mockPlayerTwo.scores[0], isCanceled: true };

          command.execute();

          expect(expectedScore).toStrictEqual(mockPlayerTwo.scores[0]);
        });
      });
      describe('and the score has too many misses', () => {
        it("should not change other players' scores", () => {
          const mockPlayer: Player = {
            name: 'mock-player',
            scores: [{ value: 100, misses: 0, isCanceled: false }],
            turnCount: 0,
          };
          const mockPlayerTwo: Player = {
            name: 'mock-player-two',
            scores: [{ value: 200, misses: 3, isCanceled: false }],
            turnCount: 0,
          };
          const mockPlayers = [mockPlayer, mockPlayerTwo];
          const command = new AddScoreWithScoreCancelCommand(mockPlayer, 100, scoreService, turnService, mockPlayers);
          const expectedScore = { ...mockPlayerTwo.scores[0], misses: 3 };

          command.execute();

          expect(expectedScore).toStrictEqual(mockPlayerTwo.scores[0]);
        });
      });

      describe('and score is valid', () => {
        it("should cancel other players' scores", () => {
          const mockPlayer: Player = {
            name: 'mock-player',
            scores: [{ value: 100, misses: 0, isCanceled: false }],
            turnCount: 0,
          };
          const mockPlayerTwo: Player = {
            name: 'mock-player-two',
            scores: [{ value: 200, misses: 2, isCanceled: false }],
            turnCount: 0,
          };
          const mockPlayers = [mockPlayer, mockPlayerTwo];
          const command = new AddScoreWithScoreCancelCommand(mockPlayer, 100, scoreService, turnService, mockPlayers);
          const expectedScore = { ...mockPlayerTwo.scores[0], isCanceled: true };

          command.execute();

          expect(expectedScore).toStrictEqual(mockPlayerTwo.scores[0]);
        });
      });
    });
  });

  describe('undo', () => {
    it('should remove score if it is the last one', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);
      command.execute();

      command.undo();

      const { scores } = player;
      expect(scores.length).toBe(1);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
    });

    it('should remove score if other scores have been added', () => {
      const scores = [{ value: 100, misses: 0, isCanceled: false }];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);
      command.execute();
      scores.push({ value: 300, misses: 0, isCanceled: false });

      command.undo();

      expect(scores.length).toBe(2);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
      expect(scores[1].value).toBe(300);
      expect(scores[1].misses).toBe(0);
    });

    it('should not do anything if not already executed', () => {
      const scores = [{ value: 100, misses: 0, isCanceled: false }];
      const player: Player = { name: 'ant', scores, turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);

      command.undo();

      expect(scores.length).toBe(1);
      expect(scores[0].value).toBe(100);
      expect(scores[0].misses).toBe(0);
    });

    it('should remove turn played', () => {
      const player: Player = { name: 'ant', scores: [{ value: 100, misses: 0, isCanceled: false }], turnCount: 0 };
      const command = new AddScoreWithScoreCancelCommand(player, 100, scoreService, turnService, [player]);
      command.execute();
      expect(player.turnCount).toBe(1);

      command.undo();

      expect(player.turnCount).toBe(0);
    });

    it('should mark canceled score as not canceled', () => {
      const mockPlayer: Player = {
        name: 'mock-player',
        scores: [{ value: 100, misses: 0, isCanceled: false }],
        turnCount: 0,
      };
      const mockPlayerTwo: Player = {
        name: 'mock-player-two',
        scores: [{ value: 200, misses: 2, isCanceled: false }],
        turnCount: 0,
      };
      const mockPlayers = [mockPlayer, mockPlayerTwo];
      const command = new AddScoreWithScoreCancelCommand(mockPlayer, 100, scoreService, turnService, mockPlayers);
      const expectedCanceledScore = { ...mockPlayerTwo.scores[0], isCanceled: true };
      command.execute();
      expect(expectedCanceledScore).toStrictEqual(mockPlayerTwo.scores[0]);
      const expectedNotCanceledScore = { ...mockPlayerTwo.scores[0], isCanceled: false };

      command.undo();

      expect(expectedNotCanceledScore).toStrictEqual(mockPlayerTwo.scores[0]);
    });
  });
});
