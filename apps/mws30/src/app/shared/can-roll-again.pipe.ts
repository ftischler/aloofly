import { Pipe, PipeTransform } from '@angular/core';
import { Dice, Dices } from '@aloofly/mws30-models';
import { objectToKeyValues } from '../common/object-to-key-values';
import { KeyValue } from '@angular/common';

@Pipe({
  name: 'canRollAgain'
})
export class CanRollAgainPipe implements PipeTransform {
  transform(dices: Dices): boolean {
    const keyValue: Array<KeyValue<string, Dice>> = objectToKeyValues(dices);
    const pickedDicesCount = keyValue.reduce((acc, {value}) => value.picked ? acc + 1 : acc, 0);
    return !!keyValue.length &&  pickedDicesCount > 0 && pickedDicesCount < 6;
  }
}
