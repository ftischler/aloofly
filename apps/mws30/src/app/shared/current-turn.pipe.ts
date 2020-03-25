import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player, Turn } from '@aloofly/mws30-models';
import { getCurrentTurn } from '../common/get-current-turn';

@Pipe({
  name: 'currentTurn'
})
export class CurrentTurnPipe implements PipeTransform {
  transform(game: Game, player: Player): Turn | undefined {
    return getCurrentTurn(game, player);
  }
}
