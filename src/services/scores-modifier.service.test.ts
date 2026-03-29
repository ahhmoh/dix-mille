import { Scores } from "../components/scores/scores";
import { ScoreModifierService } from "./scores-modifier.service";

describe("ScoresModifierService", () => {
    let service: ScoreModifierService;

    beforeEach(() => {
        service = new ScoreModifierService();
    });

    describe("addPlayer", () => {
        it("should add a player with corresponding name", () => {
            //given
            const name = "antwan";
            const scores: Scores = {};

            expect(Object.keys(scores).length).toBe(0);

            //when
            const transformedScores = service.addPlayer(scores, name);

            // then
            expect(Object.keys(transformedScores).length).toBe(1);
            expect(transformedScores[name].name).toBe(name);
            expect(transformedScores[name].scores.length).toBe(0);

        });

        it("should not do anything if no name passed", () => {
            //given
            const emptyName = "";
            const scores: Scores = {};

            expect(Object.keys(scores).length).toBe(0);

            //when
            const transformed = service.addPlayer(scores, emptyName);

            // then
            expect(Object.keys(transformed).length).toBe(0);
        });
    });

    // describe("removePlayer", () => {
    //     let scores: Scores;

    //     beforeEach(() => {
    //         scores = new Scores();
    //         service.addPlayer(scores, "ant");
    //         service.addPlayer(scores, "apo");
    //         service.addPlayer(scores, "oran");
    //     });

    //     it.each([
    //         { indexToRemove: 0 },
    //         { indexToRemove: 1 },
    //         { indexToRemove: 2 },
    //     ])("should remove player based on an index", ({ indexToRemove }) => {
    //         //given
    //         const expectedScoreLength = scores.scoresForPlayers.length - 1;
    //         const expectedPlayerRemoved: string = scores.scoresForPlayers[indexToRemove].name;

    //         //when
    //         service.removePlayer(scores, indexToRemove);

    //         // then
    //         expect(scores.scoresForPlayers.length).toBe(expectedScoreLength);
    //         scores.scoresForPlayers
    //             .forEach(playerScore => expect(playerScore.name).not.toBe(expectedPlayerRemoved))
    //     });

    //     it.each([
    //         { indexToRemove: -1 },
    //         { indexToRemove: 3 },
    //     ])("should not do anything if index is index is out of bound", ({ indexToRemove }) => {
    //         //given
    //         const expectedScoreLength = scores.scoresForPlayers.length;

    //         //when
    //         service.removePlayer(scores, indexToRemove);

    //         // then
    //         expect(scores.scoresForPlayers.length).toBe(expectedScoreLength);
    //     });

    //     it("should not do anything if there are no players", () => {
    //         //given
    //         const scores = new Scores();

    //         expect(scores.scoresForPlayers.length).toBe(0);

    //         //when
    //         service.removePlayer(scores, 1);

    //         // then
    //         expect(scores.scoresForPlayers.length).toBe(0);
    //     });
    // });

    describe("saveScore", () => {
        let scores: Scores;

        beforeEach(() => {
            scores = {};
            scores = service.addPlayer(scores, "ant");
            scores = service.addPlayer(scores, "apo");
        });

        it("should add a new score for player", () => {
            // given
            const player = "ant";

            const firstScore = 100;
            const secondScore = 200;
            const playerScores = scores[player].scores;

            //when
            service.saveScore(scores, player, firstScore);
            service.saveScore(scores, player, secondScore);

            // then
            expect(playerScores.length).toBe(2);

            const actualFirstScore = playerScores[0].value;
            expect(actualFirstScore).toBe(firstScore);

            const actualSecondScore = playerScores[1].value;
            expect(actualSecondScore).toBe(firstScore + secondScore);
        });

        it.each([
            { illegalScore: -100 },
            { illegalScore: 0 },
        ])("should not save score if illegal", ({ illegalScore }) => {
            // given
            const player = "ant";

            //when
            service.saveScore(scores, player, illegalScore);

            // then
            expect(scores[player].scores.length).toBe(0);
        });
    });

    // describe("addMissToPlayer", () => {
    //     let scores: Scores;

    //     beforeEach(() => {
    //         scores = new Scores();
    //         service.addPlayer(scores, "ant");
    //     });

    //     it("should add miss to last score", () => {
    //         // given
    //         const indexPlayer = 0;
    //         const playerScores = scores.scoresForPlayers[indexPlayer].scores;

    //         const firstScore = 100;
    //         const secondScore = 200;
    //         service.saveScore(scores, 0, firstScore);
    //         service.saveScore(scores, 0, secondScore);

    //         //when
    //         service.addMissToPlayer(scores, indexPlayer);
    //         service.addMissToPlayer(scores, indexPlayer);

    //         // then
    //         expect(playerScores[playerScores.length - 1].misses).toBe(2);
    //     });

    //     it("should not add more than 2 misses to last score", () => {
    //         // given
    //         const indexPlayer = 0;
    //         const playerScores = scores.scoresForPlayers[indexPlayer].scores;

    //         service.saveScore(scores, 0, 100);

    //         //when
    //         service.addMissToPlayer(scores, indexPlayer);
    //         service.addMissToPlayer(scores, indexPlayer);
    //         service.addMissToPlayer(scores, indexPlayer);

    //         // then
    //         expect(playerScores[playerScores.length - 1].misses).toBe(2);
    //     });

    //     it("should not do anything if no scores registered yet", () => {
    //         // given
    //         const indexPlayer = 0;
    //         const playerScores = scores.scoresForPlayers[indexPlayer].scores;

    //         //when
    //         service.addMissToPlayer(scores, indexPlayer);

    //         // then
    //         expect(playerScores.length).toBe(0);
    //     });
    // });
});