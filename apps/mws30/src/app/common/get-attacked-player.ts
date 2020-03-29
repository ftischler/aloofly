import { Game, Player } from '@aloofly/mws30-models';
import { getCurrentTurn } from './get-current-turn';

export function getAttackedPlayer(game: Game, player: Player): Player | undefined {
  const currentTurn = getCurrentTurn(game, player);
  const attackingPlayerId: string | undefined = currentTurn?.attackingPlayerId;
  return attackingPlayerId ? game.players[attackingPlayerId] : undefined;
}
