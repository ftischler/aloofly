import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';

@Pipe({
  name: 'currentTurnId'
})
export class CurrentTurnIdPipe implements PipeTransform {
  transform(game: Game, player: Player): string | undefined {
    let turnId: string | undefined;

    for (const key in player.turns) {
      if (player.turns.hasOwnProperty(key) && player.turns[key].turnNumber === game.turnNumber) {
        turnId = key;
        break;
      }
    }

    return turnId;
  }
}
