import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';

@Pipe({
  name: 'unpickedDices'
})
export class UnpickedDicesPipe implements PipeTransform {
  transform(dices: Dices): Dices {
    let newDices: Dices = {};

    for (const key in dices) {
      if (dices.hasOwnProperty(key) && !dices[key].picked) {
        newDices = {
          ...newDices,
          [key]: dices[key]
        };
      }
    }

    return newDices;
  }
}
