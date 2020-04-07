import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game, GameContext } from '@aloofly/mws30-models';
import { GameService } from '../../services/game.service';
import { take, takeUntil } from 'rxjs/operators';
import { QrCodeDialogComponent } from '../../game-models/dialogs/qr-code-dialog/qr-code-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mws30-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameTableComponent implements OnDestroy {
  @Input() ctx$: Observable<GameContext>;

  private destroy$ = new Subject<void>();

  constructor(private gameService: GameService, private matDialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  openQrCode(): void {
    this.ctx$.pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe(ctx => {
      this.matDialog.open(QrCodeDialogComponent, {data: ctx});
    });
  }

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

    if (payPalUrl) {
      window.open(payPalUrl, '_blank', 'noreferrer noopener');
    }

    await this.gameService.payGame(game);
  }
}
