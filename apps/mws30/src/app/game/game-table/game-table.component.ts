import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameContext } from '@aloofly/mws30-models';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'mws30-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTableComponent {
  @Input() ctx$: Observable<GameContext>;

  constructor(private gameService: GameService) {}

  async restartGame(ctx: GameContext): Promise<void> {
    await this.gameService.restartGame(ctx);
  }

  async openPayPalLink(game: Game, amount: number): Promise<void> {
    const payPalUrl = [game.payPalDonationLink, `${amount}`].join('/');
    window.open(payPalUrl, '_blank', 'noreferrer noopener');

    await this.gameService.payGame(game);
  }
}
