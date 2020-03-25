import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';

@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {
  transform(player: Player, game: Game): boolean {
    return game.createdBy.id === player.id;
  }
}
