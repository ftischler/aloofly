import { Game, Player, Turn } from '@aloofly/mws30-models';

export function getCurrentTurn(game: Game, player: Player): Turn | undefined {
  return Object.values(player.turns || {}).find(turn => game.turnNumber === turn.turnNumber);
}
