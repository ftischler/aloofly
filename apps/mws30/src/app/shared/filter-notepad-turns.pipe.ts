import { Pipe, PipeTransform } from '@angular/core';
import { Turn } from '@aloofly/mws30-models';
import { filterNodePadTurns } from '../common/filter-notepad-turns';

@Pipe({
  name: 'filterNotepadTurns'
})
export class FilterNotepadTurnsPipe implements PipeTransform {
  transform(turns: Turn[]): Turn[] {
    return filterNodePadTurns(turns);
  }
}
