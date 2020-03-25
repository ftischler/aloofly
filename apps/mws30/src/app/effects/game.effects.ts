import { Inject, Injectable } from '@angular/core';
import { GameContext } from '@aloofly/mws30-models';
import { Observable } from 'rxjs';
import { GAME_CONTEXT } from '../common/game-context';
import { createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class GameEffects {
  ctx$ = createEffect(() => this.gameContext$.pipe(tap(console.log)), {dispatch: false});
  constructor(@Inject(GAME_CONTEXT) private gameContext$: Observable<GameContext>) { }
}
