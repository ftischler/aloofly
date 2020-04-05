import { Pipe, PipeTransform } from '@angular/core';
import { Dices } from '@aloofly/mws30-models';

@Pipe({
  name: 'hasRolled'
})
export class HasRolledPipe implements PipeTransform {
  transform(dices: Dices): boolean {
    return !!(
      dices && Object.values(dices).reduce((acc, { value }) => acc + value, 0)
    );
  }
}
