import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GameService } from '../services/game.service';
import { Game, GameContext, Player } from '@aloofly/mws30-models';
import { RouterFacade } from '../+state/router.facade';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mws30-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  gameId$: Observable<string> = this.routerFacade.routeParams$.pipe(
    filter(Boolean),
    map(({ gameId }) => gameId)
  );

  playerId$: Observable<string> = this.routerFacade.routeParams$.pipe(
    filter(Boolean),
    map(({ playerId }) => playerId)
  );

  game$: Observable<Game> = this.gameId$.pipe(
    switchMap(gameId => this.gameService.getGame(gameId)),
    filter<Game>(Boolean)
  );

  player$: Observable<Player> = combineLatest([
    this.gameId$,
    this.playerId$
  ]).pipe(
    switchMap(([gameId, playerId]) =>
      this.gameService.getPlayer(gameId, playerId)
    ),
    filter<Player>(Boolean)
  );

  ctx$: Observable<GameContext> = combineLatest([
    this.player$,
    this.game$
  ]).pipe(map(([player, game]) => ({ player, game })));

  constructor(
    private routerFacade: RouterFacade,
    private gameService: GameService,
    private matSnackBar: MatSnackBar
  ) {}

  async startGame(gameId: string): Promise<void> {
    await this.gameService.startGame(gameId);
  }

  copiedLink(): void {
    this.matSnackBar.open(
      'Der Text wurde in die Zwischenablage kopiert',
      'Okay',
      { duration: 1500 }
    );
  }
}
