import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dice, Dices } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-dice-cup-view',
  templateUrl: './dice-cup-view.component.html',
  styleUrls: ['./dice-cup-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceCupViewComponent {
  @Input() dices: Dices;
}
