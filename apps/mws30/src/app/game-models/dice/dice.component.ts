import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dice } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceComponent {
  @Input() dice: Dice;
}
