import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GameService } from '../services/game.service';
import { Game, GameContext, Player } from '@aloofly/mws30-models';
import { RouterFacade } from '../+state/router.facade';

@Component({
  selector: 'mws30-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  gameId$: Observable<string> = this.routerFacade.routeParams$.pipe(
    filter(Boolean),
    map(({gameId}) => gameId)
  );

  playerId$: Observable<string> = this.routerFacade.routeParams$.pipe(
    filter(Boolean),
    map(({playerId}) => playerId)
  );

  game$: Observable<Game> = this.gameId$.pipe(
    switchMap(gameId => this.gameService.getGame(gameId)),
    filter<Game>(Boolean)
  );

  player$: Observable<Player> = combineLatest([
    this.gameId$,
    this.playerId$
  ]).pipe(
    switchMap(([gameId, playerId]) => this.gameService.getPlayer(gameId, playerId)),
    filter<Player>(Boolean)
  );

  ctx$: Observable<GameContext> = combineLatest([
    this.player$,
    this.game$
  ]).pipe(
    map(([player, game]) => ({player, game}))
  );

  constructor(private routerFacade: RouterFacade, private gameService: GameService) { }

  async startGame(gameId: string): Promise<void> {
    await this.gameService.startGame(gameId);
  }
}
