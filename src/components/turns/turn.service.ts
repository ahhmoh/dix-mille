import { Player } from "../player/player";

export class TurnService {
  public getPlayerOrder(players: Array<Player>, player: Player): number {
    const order = players.findIndex(p => player.name === p.name);
    if (order === -1) {
      throw new Error(`Player '${player}' is not part of the players array`);
    }

    return order;
  }

  public getNextPlayer(players: Array<Player>, current: Player): Player {
    const currentPlayerOrder = this.getPlayerOrder(players, current);
    return currentPlayerOrder === players.length - 1 ?
      players[0]
      : players[currentPlayerOrder + 1];
  }

  public getPreviousPlayer(players: Array<Player>, current: Player): Player | undefined {
    const currentPlayerOrder = this.getPlayerOrder(players, current);
    const previousPlayer = currentPlayerOrder === 0 ?
      players[players.length - 1]
      : players[currentPlayerOrder - 1];

    return previousPlayer.turnCount === 0 ? undefined : previousPlayer;
  }

  public addTurnPlayed(player: Player): Player {
    player.turnCount++;
    return player;
  }

  public removeTurnPlayed(player: Player): Player {
    if (player.turnCount === 0) {
      return player;
    }

    player.turnCount--;
    return player;
  }
}

export const turnService = new TurnService();