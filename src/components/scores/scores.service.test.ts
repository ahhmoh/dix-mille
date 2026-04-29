import { Player } from '@/components/player/player';
import { Score } from './scores';
import { scoreService, ScoreService } from './scores.service';

describe('ScoresService', () => {
  let service: ScoreService;

  beforeEach(() => {
    service = new ScoreService();
  });

  describe('addPlayer', () => {
    it('should add a player with corresponding name', () => {
      //given
      const name = 'antwan';
      const players: Player[] = [];

      //when
      const transformed = service.addPlayer(players, name);

      // then
      expect(transformed.length).toBe(1);
      expect(transformed[0].name).toBe(name);
      expect(transformed[0].scores.length).toBe(0);
    });

    it('should not do anything if no name passed', () => {
      //given
      const emptyName = '';
      const players: Player[] = [];

      //when
      const transformed = service.addPlayer(players, emptyName);

      // then
      expect(transformed.length).toBe(0);
    });

    it('should not do anything if player already exist', () => {
      //given
      const playerName = 'and';
      const player: Player = { name: playerName, scores: [], turnCount: 0 }
      const players: Player[] = [player];

      //when
      const transformed = service.addPlayer(players, playerName);

      // then
      expect(transformed.length).toBe(1);
      expect(players[0]).toBe(player);
    });
  });

  describe("removePlayer", () => {
    it("should remove player from a player list", () => {
      const player: Player = { name: "and", scores: [], turnCount: 0 };
      const players: Player[] = [
        player,
        { name: "abo", scores: [], turnCount: 0 },
      ];

      const transformed = service.removePlayer(players, player);

      expect(transformed.length).toBe(1);
      expect(transformed[0].name).toBe("abo");
    });

    it("should not remove if player not in list", () => {
      const player: Player = { name: "and", scores: [], turnCount: 0 };
      const players: Player[] = [
        { name: "oro", scores: [], turnCount: 0 },
        { name: "abo", scores: [], turnCount: 0 },
      ];

      const transformed = service.removePlayer(players, player);

      expect(transformed.length).toBe(2);
    });
  });

  describe('saveScore', () => {
    it('should add a new score for player', () => {
      // given
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };

      const firstScore = 100;
      const secondScore = 200;

      //when
      service.saveScore(player, firstScore);
      service.saveScore(player, secondScore);

      // then
      const playerScores = player.scores;
      expect(playerScores.length).toBe(2);

      const actualFirstScore = playerScores[0].value;
      expect(actualFirstScore).toBe(firstScore);

      const actualSecondScore = playerScores[1].value;
      expect(actualSecondScore).toBe(firstScore + secondScore);
    });

    it('should add new score based on the last valid score', () => {
      // given
      const player: Player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 0 },
          { value: 500, misses: 3 },
          { value: 700, misses: 3 },
        ],
        turnCount: 0,
      };

      //when
      service.saveScore(player, 200);

      // then
      const actualScores = player.scores;
      expect(actualScores[actualScores.length - 1].value).toBe(300);
    });

    it('should add new score at the end of score array', () => {
      // given
      const player: Player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 0 },
          { value: 500, misses: 3 },
          { value: 700, misses: 3 },
        ],
        turnCount: 0,
      };

      //when
      const scoreAdded = service.saveScore(player, 200);

      // then
      const actualScores = player.scores;
      expect(actualScores[actualScores.length - 1]).toBe(scoreAdded);
    });

    it.each([{ illegalScore: -100 }, { illegalScore: 0 }])('should throw if score is illegal', ({ illegalScore }) => {
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };

      expect(() => service.saveScore(player, illegalScore)).toThrow();
    });
  });

  describe('removeLastScore', () => {
    it('should remove last score', () => {
      // given
      const player: Player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 0 },
          { value: 500, misses: 3 },
          { value: 700, misses: 3 },
        ],
        turnCount: 0,
      };

      //when
      service.removeLastScore(player);

      // then
      const actualScores = player.scores;
      expect(actualScores.length).toBe(2);
      expect(actualScores[0].value).toBe(100);
      expect(actualScores[1].value).toBe(500);
    });

    it('should not do anything if no scores present', () => {
      // given
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };

      //when
      service.removeLastScore(player);

      // then
      const actualScores = player.scores;
      expect(actualScores).toEqual([]);
    });
  });

  describe('addMissToPlayer', () => {
    const playerName = 'ant';

    describe('with last score being the last one saved', () => {
      it('should add miss to last score', () => {
        // given
        const scores = [
          { value: 100, misses: 0 },
          { value: 200, misses: 0 },
        ];
        const player: Player = { name: 'ant', scores, turnCount: 0 };

        //when
        service.addMissToPlayer(player);
        service.addMissToPlayer(player);

        // then
        const actualScores = player.scores;
        expect(actualScores[actualScores.length - 2].misses).toBe(0);
        expect(actualScores[actualScores.length - 1].misses).toBe(2);
      });

      it('should not add more than 3 misses to last score', () => {
        // given
        const scores = [{ value: 100, misses: 0 }];
        const player: Player = { name: 'ant', scores, turnCount: 0 };

        //when
        service.addMissToPlayer(player);
        service.addMissToPlayer(player);
        service.addMissToPlayer(player);
        service.addMissToPlayer(player);

        // then
        const actualScores = player.scores;
        expect(actualScores[actualScores.length - 1].misses).toBe(3);
      });
    });

    describe('with score already invalidated', () => {
      it('should add miss only to last valid score', () => {
        const scores = [
          { value: 100, misses: 0 },
          { value: 200, misses: 3 },
          { value: 500, misses: 3 },
        ];
        const player: Player = { name: 'ant', scores, turnCount: 0 };

        service.addMissToPlayer(player);
        service.addMissToPlayer(player);

        const actualScores = player.scores;
        expect(actualScores[0].misses).toBe(2);
      });
    });

    it('should not do anything if no scores registered yet', () => {
      // given
      const player: Player = { name: 'ant', scores: [], turnCount: 0 };

      //when
      service.addMissToPlayer(player);

      // then
      expect(player.scores.length).toBe(0);
    });

    it('should not do anything if every scores invalid', () => {
      // given
      const player: Player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 3 },
          { value: 200, misses: 3 },
          { value: 500, misses: 3 },
        ],
        turnCount: 0,
      };

      //when
      service.addMissToPlayer(player);

      // then
      const actualScores = player.scores;
      expect(actualScores[0].misses).toBe(3);
      expect(actualScores[1].misses).toBe(3);
      expect(actualScores[2].misses).toBe(3);
    });
  });

  describe('removeMissFromScore', () => {
    it('should remove miss from score', () => {
      const score: Score = { value: 100, misses: 2 };

      scoreService.removeMissFromScore(score);

      expect(score.misses).toBe(1);
    });

    it('should not change miss value to negative', () => {
      const score: Score = { value: 100, misses: 0 };

      scoreService.removeMissFromScore(score);

      expect(score.misses).toBe(0);
    });
  });

  describe('getLastValidScore', () => {
    it.each([0, 1, 2])('should retrieve last score saved if it has less than 3 misses', (missCountForValidScore) => {
      const player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 0 },
          { value: 200, misses: missCountForValidScore },
        ],
        turnCount: 0,
      };

      const score = service.getLastValidScore(player);

      expect(score?.value).toBe(200);
    });

    it('should retrieve last valid score if next scores are invalid', () => {
      const player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 0 },
          { value: 200, misses: 3 },
          { value: 300, misses: 3 },
        ],
        turnCount: 0,
      };

      const score = service.getLastValidScore(player);

      expect(score?.value).toBe(100);
    });

    it('should return undefined if no valid score found', () => {
      const player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 3 },
          { value: 200, misses: 3 },
          { value: 300, misses: 3 },
        ],
        turnCount: 0,
      };

      const score = service.getLastValidScore(player);

      expect(score).toBeUndefined();
    });
  });
});
