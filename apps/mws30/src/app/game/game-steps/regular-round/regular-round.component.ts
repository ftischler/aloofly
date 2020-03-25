import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dices, GameContext } from '@aloofly/mws30-models';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'mws30-regular-round',
  templateUrl: './regular-round.component.html',
  styleUrls: ['./regular-round.component.scss']
})
export class RegularRoundComponent {
  @Input() ctx$: Observable<GameContext>;
  constructor(private gameService: GameService) { }

  async saveIntermediateResult(ctx: GameContext, currentTurnId: string, dices: Dices): Promise<void> {
    await this.gameService.saveIntermediateResult(ctx, currentTurnId, dices);
  }
}
