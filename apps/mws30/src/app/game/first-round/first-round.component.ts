import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dices, Game, GameContext } from '@aloofly/mws30-models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../../services/game.service';
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
    startPlayer: new FormControl('', Validators.required)
  });

  constructor(
    private gameService: GameService,
    private matSnackBar: MatSnackBar
  ) {}

  async setInitialResult(ctx: GameContext, dices: Dices): Promise<void> {
    await this.gameService.setInitialResult(ctx, dices);
  }

  async startRegularGame(game: Game): Promise<void> {
    if (this.startPlayerGroup.invalid) {
      return;
    }

    const startingPlayerId: string = this.startPlayerGroup.value.startPlayer;

    if (startingPlayerId) {
      await this.gameService.startRegularGame(game, startingPlayerId);
    } else {
      this.matSnackBar.open(
        'Da ist leider etwas schief gelaufen. Versuche es bitte erneut.',
        'Okay'
      );
    }
  }
}
