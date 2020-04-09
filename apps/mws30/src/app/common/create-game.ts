import { DrinkOptions, Game, Player } from '@aloofly/mws30-models';
import { environment } from '../../environments/environment';

export function createGame(
  gameId: string,
  player: Player,
  name: string = '',
  drinkOptions: DrinkOptions = {
    paymentOption: 'none',
    payPalLink: '',
    amountPerDrink: 0,
    nameOfKneipeOrWirt: ''
  }
): Partial<Game> {
  return {
    createdAt: Date.now(),
    createdBy: player.id,
    id: gameId,
    name,
    players: {
      [player.id]: player
    },
    url: `${environment.url}/${gameId}`,
    status: 'created',
    chat: [],
    turnNumber: 0,
    ...drinkOptions,
    isPayed: false
  };
}
