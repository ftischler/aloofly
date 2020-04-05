import { GameContext, Player } from '@aloofly/mws30-models';
import { KeyValue } from '@angular/common';
import { objectToKeyValues } from './object-to-key-values';

export function getNextPlayer({ game, player }: GameContext): Player {
  const players: KeyValue<string, Player>[] = objectToKeyValues(game.players);

  const nextPlayerIndex = findIndexById(players, player) + 1;

  return (players[nextPlayerIndex] ?? players[0]).value;
}

function findIndexById(players: KeyValue<string, Player>[], player: Player) {
  return players.reduce((acc, { value: currentPlayer }, index) => {
    return currentPlayer.id === player.id ? index : acc;
  }, -1);
}
