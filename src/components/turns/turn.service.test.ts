import { Player } from '@/components/player/player';
import { TurnService } from './turn.service';

describe('TurnService', () => {
  let service: TurnService;

  beforeEach(() => {
    service = new TurnService();
  });

  describe('getPlayerOrder', () => {
    it('should retrieve given player turn order', () => {
      const player = { name: "and", scores: [], turnCount: 0 };
      const players: Player[] = [
        { name: 'abo', scores: [], turnCount: 0 },
        player,
      ];

      const actualTurnOrder = service.getPlayerOrder(players, player);

      expect(actualTurnOrder).toBe(1);
    });

    it('should throw if player not in players array', () => {
      const illegalPlayer = { name: 'not-included', scores: [], turnCount: 0 };
      const players: Player[] = [
        { name: 'abo', scores: [], turnCount: 0 },
        { name: 'and', scores: [], turnCount: 0 },
      ];

      expect(() => service.getPlayerOrder(players, illegalPlayer)).toThrow();
    });
  });

  describe('getNextPlayer', () => {
    it('should retrieve player playing next', () => {
      const players: Player[] = [
        { name: "abo", scores: [], turnCount: 0 },
        { name: 'and', scores: [], turnCount: 0 },
      ];
      const currentPlayer = players[0];

      const nextPlayer = service.getNextPlayer(players, currentPlayer);

      expect(nextPlayer.name).toBe('and');
    });

    it('should retrieve next player even after a full turn', () => {
      const players: Player[] = [
        { name: 'and', scores: [], turnCount: 0 },
        { name: "abo", scores: [], turnCount: 0 },
      ];
      const currentPlayer = players[1];

      const nextPlayer = service.getNextPlayer(players, currentPlayer);

      expect(nextPlayer.name).toBe('and');
    });
  });

  describe('getPreviousPlayer', () => {
    it('should retrieve player playing before', () => {
      const players: Player[] = [
        { name: 'and', scores: [], turnCount: 1 },
        { name: "abo", scores: [], turnCount: 0 },
      ];
      const currentPlayer = players[1];

      const previousPlayer = service.getPreviousPlayer(players, currentPlayer);

      expect(previousPlayer?.name).toBe('and');
    });

    it('should retrieve previous player even if current player is the first', () => {
      const players: Player[] = [
        { name: "abo", scores: [], turnCount: 1 },
        { name: 'and', scores: [], turnCount: 1 },
      ];
      const currentPlayer = players[0];

      const previousPlayer = service.getPreviousPlayer(players, currentPlayer);

      expect(previousPlayer?.name).toBe('and');
    });

    it('should retrieve nothing if previous player did not play already', () => {
      const players: Player[] = [
        { name: "abo", scores: [], turnCount: 0 },
        { name: 'and', scores: [], turnCount: 0 },
      ];
      const currentPlayer = players[0];

      const previousPlayer = service.getPreviousPlayer(players, currentPlayer);

      expect(previousPlayer).toBeUndefined();
    });
  });

  describe('addTurnPlayed', () => {
    it('should add turn to player', () => {
      const player: Player = { name: 'and', scores: [], turnCount: 0 };

      const transformed = service.addTurnPlayed(player);

      expect(transformed.turnCount).toBe(1);
    });
  });

  describe('removeTurnPlayed', () => {
    it('should remove turn to player', () => {
      const player: Player = { name: 'and', scores: [], turnCount: 1 };

      const transformed = service.removeTurnPlayed(player);

      expect(transformed.turnCount).toBe(0);
    });

    it('should not remove turn if already at 0', () => {
      const player: Player = { name: 'and', scores: [], turnCount: 0 };

      const transformed = service.removeTurnPlayed(player);

      expect(transformed.turnCount).toBe(0);
    });
  });
});
