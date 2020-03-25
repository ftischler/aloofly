import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GameContext } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-regular-round',
  templateUrl: './regular-round.component.html',
  styleUrls: ['./regular-round.component.scss']
})
export class RegularRoundComponent {
  @Input() ctx$: Observable<GameContext>;
  constructor() { }
}
