import { Pipe, PipeTransform } from '@angular/core';
import { Dice } from '@aloofly/mws30-models';

@Pipe({
  name: 'unpickedDices'
})
export class UnpickedDicesPipe implements PipeTransform {
  transform(dices: Dice[]): Dice[] {
    return dices.filter(dice => !dice.picked);
  }
}
