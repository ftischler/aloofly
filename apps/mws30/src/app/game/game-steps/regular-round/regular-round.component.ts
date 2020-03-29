import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dice, Dices, GameContext, Player, Turn } from '@aloofly/mws30-models';
import { GameService } from '../../../services/game.service';
import { getDicesValue } from '../../../common/get-dices-value';
import { getNextPlayer } from '../../../common/get-next-player';
import { createDices } from '../../../common/create-dices';
import { getAttackValue } from '../../../common/get-attack-value';

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

  async closeAttack(ctx: GameContext, currentTurnId: string, currentTurn: Turn, currentDices: Dices, allDices: Dices, attackedPlayer: Player): Promise<void> {
    const newDices: Dices = {...allDices, ...currentDices};
    await this.gameService.saveIntermediateResult(ctx, currentTurnId, newDices);
    await this.gameService.closeAttack(ctx, attackedPlayer, getAttackValue(newDices), currentTurn);
  }

  async closeRegularRound(ctx: GameContext, currentTurnId: string, currentTurn: Turn, dices: Dices): Promise<void> {
    const oldScore: number = ctx.player.currentScore!;
    const attacksWith: number = currentTurn.attacksWith!;
    const currentScore: number = attacksWith > 0 ? oldScore : oldScore + attacksWith;
    const nextPlayerId: string = getNextPlayer(ctx).id;

    const attackingPlayer: Partial<Turn> = attacksWith > 0 ? {attackingPlayerId: nextPlayerId} : {};

    const newTurn: Turn = {
      ...currentTurn,
      ...attackingPlayer,
      dices,
      currentScore,
      attacksWith
    };

    await this.gameService.saveTurn(ctx, currentTurnId,  newTurn);

    if (newTurn.attacksWith !== undefined && newTurn.attacksWith > 0) {
      await this.gameService.saveTurn(ctx, currentTurnId, {
        ...newTurn,
        dices: createDices()
      });
    } else {
      await this.gameService.closeTurn(ctx, newTurn);
      await this.gameService.startTurn(ctx.game, nextPlayerId);
    }

    if (currentScore < 1) {
      await this.gameService.looseGame(ctx.game, ctx.player);
    }
  }
}
