import { Game, Player } from '@aloofly/mws30-models';

export function getPlayerById(game: Game, playerId: string): Player | undefined {
  return Object.values(game.players).find(player => player.id === playerId);
}
