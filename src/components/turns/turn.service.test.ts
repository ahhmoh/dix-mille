import { Player } from "@/components/player/player";
import { TurnService } from "./turn.service";

describe("TurnService", () => {
    let service: TurnService;

    beforeEach(() => {
        service = new TurnService();
    });

    describe("getPlayerOrder", () => {
        it("should retrieve given player turn order", () => {
            const playerName = "antwan";
            const players: Player[] = [
                { name: "abo", scores: [] },
                { name: playerName, scores: [] }
            ];

            const actualTurnOrder = service.getPlayerOrder(players, playerName);

            expect(actualTurnOrder).toBe(1);
        });

        it("should throw if player not in players array", () => {
            const illegalPlayer = "not-included";
            const players: Player[] = [
                { name: "abo", scores: [] },
                { name: "and", scores: [] }
            ];

            expect(() => service.getPlayerOrder(players, illegalPlayer)).toThrow();
        });
    });

    describe("getNextPlayer", () => {
        it("should retrieve player playing next", () => {
            const currentPlayer = "abo";
            const players: Player[] = [
                { name: currentPlayer, scores: [] },
                { name: "and", scores: [] }
            ];

            const nextPlayer = service.getNextPlayer(players, currentPlayer);

            expect(nextPlayer.name).toBe("and");
        });

        it("should retrieve next player even after a full turn", () => {
            const currentPlayer = "abo";
            const players: Player[] = [
                { name: 'and', scores: [] },
                { name: currentPlayer, scores: [] }
            ];

            const nextPlayer = service.getNextPlayer(players, currentPlayer);

            expect(nextPlayer.name).toBe("and");
        });
    });

});