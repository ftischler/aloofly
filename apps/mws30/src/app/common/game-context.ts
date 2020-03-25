import { RouterFacade } from '../+state/router.facade';
import { GameService } from '../services/game.service';
import { combineLatest, Observable } from 'rxjs';
import { GameContext } from '@aloofly/mws30-models';
import { filter, map, switchMap } from 'rxjs/operators';
import { FactoryProvider, InjectionToken } from '@angular/core';

export function gameContextFactory(routerFacade: RouterFacade, gameService: GameService): Observable<GameContext> {
  return routerFacade.routeParams$.pipe(
    filter(Boolean),
    filter<{gameId: string, playerId: string}>(({gameId, playerId}) => !!(gameId && playerId)),
    switchMap(({gameId, playerId}) => combineLatest([
      gameService.getGame(gameId),
      gameService.getPlayer(gameId,playerId)
    ]).pipe(
      map(([game, player]) => ({game, player}))
    ))
  );
}

export const GAME_CONTEXT = new InjectionToken<Observable<GameContext>>('GAME_CONTEXT');

export const GAME_CONTEXT_PROVIDER: FactoryProvider = {
  provide: GAME_CONTEXT,
  useFactory: gameContextFactory,
  deps: [RouterFacade, GameService]
};
