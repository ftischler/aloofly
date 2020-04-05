import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '@aloofly/mws30-models';

@Pipe({
  name: 'isFirstRound'
})
export class IsFirstRoundPipe implements PipeTransform {
  transform(game: Game): boolean {
    return game.turnNumber === 0;
  }
}
