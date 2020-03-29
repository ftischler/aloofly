import { DrinkOptions, Game, Player } from '@aloofly/mws30-models';
import { environment } from '../../environments/environment';

export function createGame(gameId: string, player: Player, drinkOptions: DrinkOptions = {}): Partial<Game> {
  return {
    createdAt: Date.now(),
    createdBy: player.id,
    id: gameId,
    players: {
      [player.id]: player
    },
    url: `${environment.url}/${gameId}`,
    status: 'created',
    chat: [],
    turnNumber: 0,
    ...drinkOptions
  };
}
