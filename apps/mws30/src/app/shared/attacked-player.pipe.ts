import { Pipe, PipeTransform } from '@angular/core';
import { Game, Player } from '@aloofly/mws30-models';
import { getAttackedPlayer } from '../common/get-attacked-player';

@Pipe({
  name: 'attackedPlayer'
})
export class AttackedPlayerPipe implements PipeTransform {
  transform(game: Game, player: Player): Player | undefined {
    return getAttackedPlayer(game, player);
  }
}
