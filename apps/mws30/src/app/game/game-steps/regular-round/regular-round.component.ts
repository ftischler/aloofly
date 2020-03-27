import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dices, GameContext, Turn } from '@aloofly/mws30-models';
import { GameService } from '../../../services/game.service';
import { getDicesValue } from '../../../common/get-dices-value';

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

  async setAttack(ctx: GameContext, currentTurnId: string, currentTurn: Turn, currentDices: Dices, allDices: Dices): Promise<void> {
    const dices: Dices = {...allDices, ...currentDices};
    const diceValues: number = getDicesValue(dices);
    const attacksWith: number = diceValues - 30;
    await this.gameService.saveTurn(ctx, currentTurnId,  {...currentTurn, dices, attacksWith})
  }

  async closeRound(ctx: GameContext, currentTurnId: string, currentTurn: Turn, dices: Dices): Promise<void> {
    const oldScore: number = ctx.player.currentScore!;
    const attacksWith: number = currentTurn.attacksWith!;
    const currentScore: number = attacksWith > 0 ? oldScore : oldScore + attacksWith;
    await this.gameService.saveTurn(ctx, currentTurnId,  {...currentTurn, dices, currentScore, attacksWith});
  }
}
