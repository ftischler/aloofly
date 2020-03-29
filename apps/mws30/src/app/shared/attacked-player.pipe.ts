import { Pipe, PipeTransform } from '@angular/core';
import { GameContext, Player } from '@aloofly/mws30-models';
import { getAttackedPlayer } from '../common/get-attacked-player';

@Pipe({
  name: 'attackedPlayer'
})
export class AttackedPlayerPipe implements PipeTransform {
  transform(ctx: GameContext): Player | undefined {
    return getAttackedPlayer(ctx);
  }
}
