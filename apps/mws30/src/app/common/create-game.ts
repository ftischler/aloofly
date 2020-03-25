import { Game, Player } from '@aloofly/mws30-models';
import { environment } from '../../environments/environment';

export function createGame(gameId: string, player: Player): Partial<Game> {
  return {
    createdAt: Date.now(),
    createdBy: player,
    id: gameId,
    players: {
      [player.id]: player
    },
    url: `${environment.url}/game/${gameId}`,
    status: 'created',
    chat: [],
    turnNumber: 0
  };
}
