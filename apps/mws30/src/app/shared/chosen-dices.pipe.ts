import { Pipe, PipeTransform } from '@angular/core';
import { Dice, Dices } from '@aloofly/mws30-models';
import { objectToKeyValues } from '../common/object-to-key-values';
import { KeyValue } from '@angular/common';
import { keyValuesToObject } from '../common/key-values-to-object';

@Pipe({
  name: 'chosenDices'
})
export class ChosenDicesPipe implements PipeTransform {
  transform(dices: Dices, chosen: boolean = true): Dices {
    const chosenDices: Array<KeyValue<string, Dice>> = objectToKeyValues(
      dices
    ).filter(({ value }) => value.chosen === chosen);
    return keyValuesToObject(chosenDices);
  }
}
