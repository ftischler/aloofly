import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';

@Pipe({
  name: 'currentPlayer'
})
export class CurrentPlayerPipe implements PipeTransform {
  transform(game: Game): Player | undefined {
    const playerId: string | undefined = Object.keys(game.players).find(key => key === game.currentPlayerId);
    return playerId ? game.players[playerId] : undefined;
  }
}
