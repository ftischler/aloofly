import { Pipe, PipeTransform } from '@angular/core';
import { Dice } from '@aloofly/mws30-models';

@Pipe({
  name: 'pickedDices'
})
export class PickedDicesPipe implements PipeTransform {
  transform(dices: Dice[]): Dice[] {
    return dices.filter(dice => dice.picked);
  }
}
