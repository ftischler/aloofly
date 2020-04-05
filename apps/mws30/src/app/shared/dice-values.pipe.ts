import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';
import { getDicesValue } from '../common/get-dices-value';

@Pipe({
  name: 'diceValues'
})
export class DiceValuesPipe implements PipeTransform {
  transform(dices: Dices): number {
    return getDicesValue(dices);
  }
}
