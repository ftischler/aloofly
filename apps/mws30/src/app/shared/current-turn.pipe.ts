import { Pipe, PipeTransform } from '@angular/core';
import { GameContext, Turn } from '@aloofly/mws30-models';
import { getCurrentTurn } from '../common/get-current-turn';

@Pipe({
  name: 'currentTurn'
})
export class CurrentTurnPipe implements PipeTransform {
  transform({player, game}: GameContext): Turn | undefined {
    return getCurrentTurn(game, player);
  }
}
