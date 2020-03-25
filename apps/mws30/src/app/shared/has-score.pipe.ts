import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';
import { getCurrentTurn } from '../common/get-current-turn';

@Pipe({
  name: 'hasScore'
})
export class HasScorePipe implements PipeTransform {
  transform(player: Player, game: Game): boolean {
    const currentTurn = getCurrentTurn(game, player);
    return !!(player && player.turns && currentTurn && currentTurn.currentScore);
  }
}
