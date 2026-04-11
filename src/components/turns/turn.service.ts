import { Player } from "../player/player";

export class TurnService {
    public getPlayerOrder(players: Array<Player>, playerName: string): number {
        const order = players.findIndex(player => player.name === playerName);
        if (order === -1) {
            throw new Error(`Player '${playerName}' is not part of the players array`);
        }

        return order;
    }

    public getNextPlayer(order: Array<Player>, current: string): Player {
        const currentPlayerOrder = this.getPlayerOrder(order, current);
        return currentPlayerOrder === order.length - 1 ?
            order[0]
            : order[currentPlayerOrder + 1];
    }
}

export const turnService = new TurnService();