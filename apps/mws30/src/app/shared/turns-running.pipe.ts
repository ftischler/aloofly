import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '@aloofly/mws30-models';
import { allTurnsDone } from '../common/all-turns-done';

@Pipe({
  name: 'turnsRunning'
})
export class TurnsRunningPipe implements PipeTransform {
  transform(game: Game): boolean {
    return !allTurnsDone(game);
  }
}
