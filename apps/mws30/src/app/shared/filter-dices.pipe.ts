import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';
import { filterDicesByValue } from '../common/filter-dices-by-value';

@Pipe({
  name: 'filterDices'
})
export class FilterDicesPipe implements PipeTransform {
  transform(dices: Dices, filterValue: number): Dices {
    return filterDicesByValue(dices, filterValue);
  }
}
