import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dice, Game, GameContext, Player } from '@aloofly/mws30-models';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from '../../../services/game.service';
import { getPlayerById } from '../../../common/get-player-by-id';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mws30-first-round',
  templateUrl: './first-round.component.html',
  styleUrls: ['./first-round.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstRoundComponent {
  @Input() ctx$: Observable<GameContext>;
  startPlayerGroup = new FormGroup({
    startPlayer: new FormControl()
  });

  constructor(private gameService: GameService, private matSnackBar: MatSnackBar) { }

  async initialResult(ctx: GameContext, dices: Dice[]): Promise<void> {
    await this.gameService.setInitialResult(ctx, dices);
  }

  async startRegularGame(game: Game): Promise<void> {
    const startingPlayer: Player | undefined = getPlayerById(game, this.startPlayerGroup.value.startPlayer);

    if (startingPlayer) {
      await this.gameService.startRegularGame(game, startingPlayer);
    } else {
      this.matSnackBar.open('Da ist leider etwas schief gelaufen. Versuche es bitte erneut.', 'Okay');
    }
  }
}
