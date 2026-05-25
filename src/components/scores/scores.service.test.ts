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
      const player: Player = { name: playerName, scores: [], turnCount: 0 };
      const players: Player[] = [player];

      //when
      const transformed = service.addPlayer(players, playerName);

      // then
      expect(transformed.length).toBe(1);
      expect(players[0]).toBe(player);
    });
  });

  describe('removePlayer', () => {
    it('should remove player from a player list', () => {
      const player: Player = { name: 'and', scores: [], turnCount: 0 };
      const players: Player[] = [player, { name: 'abo', scores: [], turnCount: 0 }];

      const transformed = service.removePlayer(players, player);

      expect(transformed.length).toBe(1);
      expect(transformed[0].name).toBe('abo');
    });

    it('should not remove if player not in list', () => {
      const player: Player = { name: 'and', scores: [], turnCount: 0 };
      const players: Player[] = [
        { name: 'oro', scores: [], turnCount: 0 },
        { name: 'abo', scores: [], turnCount: 0 },
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

  describe('resetPlayer', () => {
    it('should remove all scores from player', () => {
      const player = {
        name: 'ant',
        scores: [
          { value: 100, misses: 3 },
          { value: 200, misses: 3 },
          { value: 300, misses: 3 },
        ],
        turnCount: 0,
      };

      const updated = service.resetPlayer(player);

      expect(updated.scores).toStrictEqual([]);
    });

    it('should not score array if no scores present', () => {
      const player = { name: 'ant', scores: [], turnCount: 0 };

      const updated = service.resetPlayer(player);

      expect(updated.scores).toStrictEqual([]);
    });

    it('should set turnCount to 0', () => {
      const player = { name: 'ant', scores: [], turnCount: 2 };

      const updated = service.resetPlayer(player);

      expect(updated.turnCount).toBe(0);
    });

    it('should not change turnCount if already at 0', () => {
      const player = { name: 'ant', scores: [], turnCount: 0 };

      const updated = service.resetPlayer(player);

      expect(updated.turnCount).toBe(0);
    });
  });

  describe('resetAllPlayers', () => {
    it('should remove all scores from all players', () => {
      const players = [
        {
          name: 'ant',
          scores: [
            { value: 100, misses: 3 },
            { value: 200, misses: 3 },
          ],
          turnCount: 2,
        },
        {
          name: 'oro',
          scores: [
            { value: 100, misses: 3 },
            { value: 200, misses: 3 },
          ],
          turnCount: 2,
        },
      ];

      const updated = service.resetAllPlayers(players);

      updated.forEach((player) => {
        expect(player.scores).toStrictEqual([]);
      });
    });

    it('should not do anything if no scores present', () => {
      const players = [
        { name: 'ant', scores: [], turnCount: 0 },
        { name: 'oro', scores: [], turnCount: 0 },
      ];

      const updated = service.resetAllPlayers(players);

      updated.forEach((player) => {
        expect(player.scores).toStrictEqual([]);
      });
    });

    it('should reset all turnCounts', () => {
      const players = [
        { name: 'ant', scores: [], turnCount: 15 },
        { name: 'oro', scores: [], turnCount: 3097 },
      ];

      const updated = service.resetAllPlayers(players);

      updated.forEach((player) => {
        expect(player.turnCount).toBe(0);
      });
    });

    it('should not change turnCounts if already at 0', () => {
      const players = [
        { name: 'ant', scores: [], turnCount: 0 },
        { name: 'oro', scores: [], turnCount: 0 },
      ];

      const updated = service.resetAllPlayers(players);

      updated.forEach((player) => {
        expect(player.turnCount).toBe(0);
      });
    });
  });

  describe('playerAboutToWin()', () => {
    const mockValueToWin = 1000;

    describe('if there is not player about to win', () => {
      const mockPlayerNotWinning: Player = { name: 'mock-name', scores: [{ value: 100, misses: 0 }], turnCount: 0 };

      it('should return undefined', () => {
        const playerWinning = service.playerAboutToWin([mockPlayerNotWinning], mockValueToWin);

        expect(playerWinning).toBeUndefined();
      });
    });

    describe('if a player is about to win', () => {
      const mockPlayerNotWinning: Player = {
        name: 'mock-name-no-winning',
        scores: [{ value: 100, misses: 0 }],
        turnCount: 0,
      };

      describe('with score equal to value to win', () => {
        const mockPlayerWinning: Player = {
          name: 'mock-name-winning',
          scores: [{ value: mockValueToWin, misses: 0 }],
          turnCount: 0,
        };

        it('should return player winning', () => {
          const mockPlayers = [mockPlayerNotWinning, mockPlayerWinning];

          const playerWinning = service.playerAboutToWin(mockPlayers, mockValueToWin);

          expect(playerWinning).toBe(playerWinning);
        });
      });

      describe('with score over value to win', () => {
        const mockPlayerWinning: Player = {
          name: 'mock-name-winning',
          scores: [{ value: mockValueToWin + 100, misses: 0 }],
          turnCount: 0,
        };

        it('should return player winning', () => {
          const mockPlayers = [mockPlayerNotWinning, mockPlayerWinning];

          const playerWinning = service.playerAboutToWin(mockPlayers, mockValueToWin);

          expect(playerWinning).toBe(playerWinning);
        });
      });

      describe('and another player has a score also higher than the value to win', () => {
        const mockPlayerWithLowerScore: Player = {
          name: 'mock-name-lower-score',
          scores: [{ value: mockValueToWin + 100, misses: 0 }],
          turnCount: 0,
        };

        const mockPlayerWinning: Player = {
          name: 'mock-name-winning',
          scores: [{ value: mockValueToWin + 200, misses: 0 }],
          turnCount: 0,
        };

        it('should return player with higher score', () => {
          const mockPlayers = [mockPlayerWithLowerScore, mockPlayerWinning];

          const playerWinning = service.playerAboutToWin(mockPlayers, mockValueToWin);

          expect(playerWinning).toBe(playerWinning);
        });
      });

      describe('and another player reaches the same score', () => {
        it('should return the first player if he is the first to score the win', () => {
          const mockPlayerWinning: Player = {
            name: 'mock-name-winning',
            scores: [{ value: mockValueToWin, misses: 0 }],
            turnCount: 1,
          };
          const mockPlayerReaching: Player = {
            name: 'mock-name-reaching',
            scores: [{ value: mockValueToWin, misses: 0 }],
            turnCount: 1,
          };
          const mockPlayers = [mockPlayerWinning, mockPlayerReaching];

          const playerWinning = service.playerAboutToWin(mockPlayers, mockValueToWin);

          expect(playerWinning).toBe(playerWinning);
        });

        it('should return the second player if he is the first to score the win', () => {
          const mockPlayerWinning: Player = {
            name: 'mock-name-winning',
            scores: [{ value: mockValueToWin, misses: 0 }],
            turnCount: 1,
          };
          const mockPlayerReaching: Player = {
            name: 'mock-name-reaching',
            scores: [{ value: mockValueToWin, misses: 0 }],
            turnCount: 2,
          };
          const mockPlayers = [mockPlayerReaching, mockPlayerWinning];

          const playerWinning = service.playerAboutToWin(mockPlayers, mockValueToWin);

          expect(playerWinning).toBe(playerWinning);
        });
      });
    });
  });

  describe('getTopPlayers()', () => {
    describe('when first player is first playing', () => {
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 2,
      };
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockFirstPlayer, mockSecondPlayer, mockThirdPlayer];

        const result = service.getTopPlayers(mockPlayers);

        expect(result.first).toBe(mockFirstPlayer);
        expect(result.second).toBe(mockSecondPlayer);
        expect(result.third).toBe(mockThirdPlayer);
      });
    });

    describe('when first player is in the middle playing', () => {
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 1000, misses: 0 }], turnCount: 3 };
      const mockLosingPlayer: Player = {
        name: 'mock-losing-player',
        scores: [{ value: 200, misses: 0 }],
        turnCount: 2,
      };
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 2,
      };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockThirdPlayer, mockLosingPlayer, mockFirstPlayer, mockSecondPlayer];

        const result = service.getTopPlayers(mockPlayers);

        expect(result.first).toBe(mockFirstPlayer);
        expect(result.second).toBe(mockSecondPlayer);
        expect(result.third).toBe(mockThirdPlayer);
      });
    });

    describe('when first player at the end', () => {
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 800, misses: 0 }], turnCount: 3 };
      const mockLosingPlayer: Player = {
        name: 'mock-losing-player',
        scores: [{ value: 200, misses: 0 }],
        turnCount: 3,
      };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 3,
      };
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockThirdPlayer, mockLosingPlayer, mockSecondPlayer, mockFirstPlayer];

        const result = service.getTopPlayers(mockPlayers);

        expect(result.first).toBe(mockFirstPlayer);
        expect(result.second).toBe(mockSecondPlayer);
        expect(result.third).toBe(mockThirdPlayer);
      });
    });
  });

  describe('getTopPlayer()', () => {
    describe('when there is only one player', () => {
      const mockPlayer: Player = { name: 'mock-player', scores: [{ value: 0, misses: 0 }], turnCount: 0 };

      it('should the only player playing', () => {
        const mockPlayers = [mockPlayer];

        const result = service.getTopPlayer(mockPlayers);

        expect(result).toBe(mockPlayer);
      });
    });

    describe('when first player is first playing', () => {
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 2,
      };
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockFirstPlayer, mockSecondPlayer, mockThirdPlayer];

        const result = service.getTopPlayer(mockPlayers);

        expect(result).toBe(mockFirstPlayer);
      });
    });

    describe('when first player is in the middle playing', () => {
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 1000, misses: 0 }], turnCount: 3 };
      const mockLosingPlayer: Player = {
        name: 'mock-losing-player',
        scores: [{ value: 200, misses: 0 }],
        turnCount: 2,
      };
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 2,
      };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockThirdPlayer, mockLosingPlayer, mockFirstPlayer, mockSecondPlayer];

        const result = service.getTopPlayer(mockPlayers);

        expect(result).toBe(mockFirstPlayer);
      });
    });

    describe('when first player at the end', () => {
      const mockThirdPlayer: Player = { name: 'mock-third-player', scores: [{ value: 800, misses: 0 }], turnCount: 3 };
      const mockLosingPlayer: Player = {
        name: 'mock-losing-player',
        scores: [{ value: 200, misses: 0 }],
        turnCount: 3,
      };
      const mockSecondPlayer: Player = {
        name: 'mock-second-player',
        scores: [{ value: 1000, misses: 0 }],
        turnCount: 3,
      };
      const mockFirstPlayer: Player = { name: 'mock-first-player', scores: [{ value: 1000, misses: 0 }], turnCount: 2 };

      it('should return the 3 best players in order', () => {
        const mockPlayers = [mockThirdPlayer, mockLosingPlayer, mockSecondPlayer, mockFirstPlayer];

        const result = service.getTopPlayer(mockPlayers);

        expect(result).toBe(mockFirstPlayer);
      });
    });
  });
});
