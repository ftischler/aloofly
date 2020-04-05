import { Game } from '@aloofly/mws30-models';

export function allTurnsDone(game: Game): boolean {
  let turnsDone = true;

  for (const player of Object.values(game.players)) {
    if (!player.turns || Object.keys(player.turns).length < game.turnNumber) {
      turnsDone = false;
      break;
    }
  }

  return turnsDone;
}
