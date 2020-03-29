import { GameContext, Player } from '@aloofly/mws30-models';
import { getCurrentTurn } from './get-current-turn';

export function getAttackedPlayer({game, player}: GameContext): Player | undefined {
  const currentTurn = getCurrentTurn(game, player);
  const attackingPlayerId: string | undefined = currentTurn?.attackingPlayerId;
  return attackingPlayerId ? game.players[attackingPlayerId] : undefined;
}
