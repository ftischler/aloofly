import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';

@Pipe({
  name: 'hasScore'
})
export class HasScorePipe implements PipeTransform {
  transform(player: Player, game: Game): boolean {
    const currentTurn = Object.values(player.turns || {}).find(turn => game.turnNumber === turn.turnNumber);

    return !!(player && player.turns && currentTurn && currentTurn.currentScore);
  }
}
