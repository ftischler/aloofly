import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';

@Pipe({
  name: 'turnFinished'
})
export class TurnFinishedPipe implements PipeTransform {
  transform(dices: Dices): boolean {
    return !Object.values(dices).some(dice => !dice.chosen);
  }
}
