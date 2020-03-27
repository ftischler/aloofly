import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dices, GameContext, Turn } from '@aloofly/mws30-models';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'mws30-regular-round',
  templateUrl: './regular-round.component.html',
  styleUrls: ['./regular-round.component.scss']
})
export class RegularRoundComponent {
  @Input() ctx$: Observable<GameContext>;

  constructor(private gameService: GameService) { }

  async saveIntermediateResult(ctx: GameContext, currentTurnId: string, currentDices: Dices, allDices: Dices): Promise<void> {
    await this.gameService.saveIntermediateResult(ctx, currentTurnId, {...allDices, ...currentDices});
  }

  async closeRound(ctx: GameContext, currentTurnId: string, currentTurn: Turn, dices: Dices): Promise<void> {
    if (currentTurn.attacksWith === undefined) {
      const diceValues: number = Object.values(dices).reduce((acc, {value}) => value + acc, 0);
      const oldScore: number = ctx.player.currentScore!;
      const attacksWith: number = diceValues - 30;
      const currentScore: number = attacksWith > 0 ? oldScore : oldScore + attacksWith;
      await this.gameService.saveTurn(ctx, currentTurnId,  {...currentTurn, dices, currentScore, attacksWith});
    }
  }
}
