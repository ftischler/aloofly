import { Inject, Injectable } from '@angular/core';
import { GameContext } from '@aloofly/mws30-models';
import { Observable } from 'rxjs';
import { GAME_CONTEXT } from '../common/game-context';

@Injectable()
export class GameEffects {
  constructor(@Inject(GAME_CONTEXT) private gameContext$: Observable<GameContext>) { }
}
