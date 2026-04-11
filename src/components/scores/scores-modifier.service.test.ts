import { Player } from "@/components/player/player";
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
            const players: Player[] = [];

            //when
            const transformedScores = service.addPlayer(players, name);

            // then
            expect(transformedScores.length).toBe(1);
            expect(transformedScores[0].name).toBe(name);
            expect(transformedScores[0].scores.length).toBe(0);

        });

        it("should not do anything if no name passed", () => {
            //given
            const emptyName = "";
            const players: Player[] = [];

            //when
            const transformed = service.addPlayer(players, emptyName);

            // then
            expect(transformed.length).toBe(0);
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
        it("should add a new score for player", () => {
            // given
            const playerName = "ant";
            const players: Player[] = [
                { name: "ant", scores: [] },
                { name: "apo", scores: [] },
            ]
            const firstScore = 100;
            const secondScore = 200;

            //when
            let transformed = service.saveScore(players, playerName, firstScore);
            transformed = service.saveScore(players, playerName, secondScore);

            // then
            const playerScores = players[0].scores;
            expect(playerScores.length).toBe(2);

            const actualFirstScore = playerScores[0].value;
            expect(actualFirstScore).toBe(firstScore);

            const actualSecondScore = playerScores[1].value;
            expect(actualSecondScore).toBe(firstScore + secondScore);
        });

        it.each([
            { illegalScore: -100 },
            { illegalScore: 0 },
        ])("should throw if score is illegal", ({ illegalScore }) => {
            const player = "ant";
            const players: Player[] = [
                { name: "ant", scores: [] },
                { name: "apo", scores: [] },
            ]

            expect(() => service.saveScore(players, player, illegalScore)).toThrow();
        });

        it("should throw if player not in array", () => {
            const playerNotIncluded = "not-included :(";
            const scoreDummy = 100;
            const players: Player[] = [
                { name: "ant", scores: [] },
                { name: "apo", scores: [] },
            ]

            expect(() => service.saveScore(players, playerNotIncluded, scoreDummy)).toThrow();
        });
    });

    describe("addMissToPlayer", () => {
        const playerName = "ant";

        it("should add miss to last score", () => {
            // given
            const scores = [
                { value: 100, misses: 0 },
                { value: 200, misses: 0 }
            ];
            const players: Player[] = [
                {
                    name: "ant",
                    scores
                },
            ]

            //when
            let transformed = service.addMissToPlayer(players, playerName);
            transformed = service.addMissToPlayer(players, playerName);

            // then
            const actualScores = transformed[0].scores;
            expect(actualScores[actualScores.length - 2].misses).toBe(0);
            expect(actualScores[actualScores.length - 1].misses).toBe(2);
        });

        it("should not add more than 2 misses to last score", () => {
            // given
            const scores = [
                { value: 100, misses: 0 },
            ];
            const players: Player[] = [
                {
                    name: "ant",
                    scores
                },
            ]

            //when
            let transformed = service.addMissToPlayer(players, playerName);
            transformed = service.addMissToPlayer(transformed, playerName);
            transformed = service.addMissToPlayer(transformed, playerName);

            // then
            const actualScores = transformed[0].scores;
            expect(actualScores[actualScores.length - 1].misses).toBe(2);
        });

        it("should not do anything if no scores registered yet", () => {
            // given
            const players: Player[] = [
                {
                    name: "ant",
                    scores: []
                },
            ]

            //when
            const transformed = service.addMissToPlayer(players, playerName);

            // then
            expect(transformed[0].scores.length).toBe(0);
        });
    });
});