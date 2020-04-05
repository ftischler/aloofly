import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';

@Pipe({
  name: 'allChosen'
})
export class AllChosenPipe implements PipeTransform {
  transform(dices: Dices): boolean {
    return Object.values(dices).every(dice => dice.chosen);
  }
}
