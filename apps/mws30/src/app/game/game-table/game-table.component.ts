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
    let payPalUrl: string | undefined;

    switch (game.paymentOption) {
      case 'payPalMe':
        payPalUrl = [game.payPalLink!.replace(/\/$/, ''), `${amount}`].join(
          '/'
        );
        break;
      case 'payPalMoneyPool':
        payPalUrl = [game.payPalLink!.replace(/\/$/, ''), 'send'].join('/');
        break;
      default:
        break;
    }

    console.log(payPalUrl);

    if (payPalUrl) {
      window.open(payPalUrl, '_blank', 'noreferrer noopener');
    }

    await this.gameService.payGame(game);
  }
}
