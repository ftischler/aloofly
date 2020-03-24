import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GameContext } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTableComponent {
  @Input() ctx$: Observable<GameContext>;
}
