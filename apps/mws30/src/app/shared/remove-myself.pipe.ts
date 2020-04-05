import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '@aloofly/mws30-models';

@Pipe({
  name: 'removeMyself'
})
export class RemoveMyselfPipe implements PipeTransform {
  transform(players: Player[], player: Player): Player[] {
    return players.filter(({ id }) => id !== player.id);
  }
}
