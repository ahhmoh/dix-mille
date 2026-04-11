import { Player } from "@/components/player/player";
import { ScoreService } from "./scores.service";

describe("ScoresService", () => {
    let service: ScoreService;

    beforeEach(() => {
        service = new ScoreService();
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
            const player: Player = { name: "ant", scores: [] };

            const firstScore = 100;
            const secondScore = 200;

            //when
            let transformed = service.saveScore(player, firstScore);
            transformed = service.saveScore(player, secondScore);

            // then
            const playerScores = transformed.scores;
            expect(playerScores.length).toBe(2);

            const actualFirstScore = playerScores[0].value;
            expect(actualFirstScore).toBe(firstScore);

            const actualSecondScore = playerScores[1].value;
            expect(actualSecondScore).toBe(firstScore + secondScore);
        });

        it("should add new score based on the last valid score", () => {
            // given
            const player: Player =
            {
                name: "ant",
                scores: [
                    { value: 100, misses: 0 },
                    { value: 500, misses: 3 },
                    { value: 700, misses: 3 },
                ]
            };


            //when
            let transformed = service.saveScore(player, 200);

            // then
            const actualScores = transformed.scores;
            expect(actualScores[actualScores.length - 1].value).toBe(300);

        });


        it.each([
            { illegalScore: -100 },
            { illegalScore: 0 },
        ])("should throw if score is illegal", ({ illegalScore }) => {
            const player: Player =
            {
                name: "ant",
                scores: []
            };

            expect(() => service.saveScore(player, illegalScore)).toThrow();
        });
    });

    describe("addMissToPlayer", () => {
        const playerName = "ant";

        describe("with last score being the last one saved", () => {
            it("should add miss to last score", () => {
                // given
                const scores = [
                    { value: 100, misses: 0 },
                    { value: 200, misses: 0 }
                ];
                const player: Player =
                {
                    name: "ant",
                    scores
                };

                //when
                let transformed = service.addMissToPlayer(player);
                transformed = service.addMissToPlayer(player);

                // then
                const actualScores = transformed.scores;
                expect(actualScores[actualScores.length - 2].misses).toBe(0);
                expect(actualScores[actualScores.length - 1].misses).toBe(2);
            });

            it("should not add more than 3 misses to last score", () => {
                // given
                const scores = [
                    { value: 100, misses: 0 },
                ];
                const player: Player =
                {
                    name: "ant",
                    scores
                };

                //when
                let transformed = service.addMissToPlayer(player);
                transformed = service.addMissToPlayer(transformed);
                transformed = service.addMissToPlayer(transformed);
                transformed = service.addMissToPlayer(transformed);

                // then
                const actualScores = transformed.scores;
                expect(actualScores[actualScores.length - 1].misses).toBe(3);
            });
        });

        describe("with score already invalidated", () => {
            it("should add miss only to last valid score", () => {
                const scores = [
                    { value: 100, misses: 0 },
                    { value: 200, misses: 3 },
                    { value: 500, misses: 3 }
                ];
                const player: Player =
                {
                    name: "ant",
                    scores
                };

                let transformed = service.addMissToPlayer(player);
                transformed = service.addMissToPlayer(player);

                const actualScores = transformed.scores;
                expect(actualScores[0].misses).toBe(2);
            });
        });

        it("should not do anything if no scores registered yet", () => {
            // given
            const player: Player =
            {
                name: "ant",
                scores: []
            };

            //when
            const transformed = service.addMissToPlayer(player);

            // then
            expect(transformed.scores.length).toBe(0);
        });

        it("should not do anything if every scores invalid", () => {
            // given
            const player: Player =
            {
                name: "ant",
                scores: [
                    { value: 100, misses: 3 },
                    { value: 200, misses: 3 },
                    { value: 500, misses: 3 }]
            };

            //when
            const transformed = service.addMissToPlayer(player);

            // then
            const actualScores = transformed.scores;
            expect(actualScores[0].misses).toBe(3);
            expect(actualScores[1].misses).toBe(3);
            expect(actualScores[2].misses).toBe(3);
        });
    });

    describe("getLastValidScore", () => {
        it.each([0, 1, 2])("should retrieve last score saved if it has less than 3 misses", (missCountForValidScore) => {
            const player = {
                name: "ant",
                scores: [
                    { value: 100, misses: 0 },
                    { value: 200, misses: missCountForValidScore },
                ]
            };

            const score = service.getLastValidScore(player);

            expect(score?.value).toBe(200);
        });

        it("should retrieve last valid score if next scores are invalid", () => {
            const player = {
                name: "ant",
                scores: [
                    { value: 100, misses: 0 },
                    { value: 200, misses: 3 },
                    { value: 300, misses: 3 },
                ]
            };

            const score = service.getLastValidScore(player);

            expect(score?.value).toBe(100);
        });

        it("should return undefined if no valid score found", () => {
            const player = {
                name: "ant",
                scores: [
                    { value: 100, misses: 3 },
                    { value: 200, misses: 3 },
                    { value: 300, misses: 3 },
                ]
            };

            const score = service.getLastValidScore(player);

            expect(score).toBeUndefined();
        });
    });
});