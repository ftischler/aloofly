import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Dice, GameContext } from '@aloofly/mws30-models';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from '../../../services/game.service';

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

  constructor(private gameService: GameService) { }

  async initialResult(ctx: GameContext, dices: Dice[]): Promise<void> {
    await this.gameService.setInitialResult(ctx, dices);
  }

  async startRegularGame(): Promise<void> {

  }
}
