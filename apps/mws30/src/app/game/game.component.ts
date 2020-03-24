import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GameService } from '../services/game.service';
import { Game, GameContext, Player } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameId$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('gameId')!),
    filter<string>(Boolean)
  );

  playerId$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('playerId')),
    filter<string>(Boolean)
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

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService) { }

  async startGame(gameId: string): Promise<void> {
    await this.gameService.startGame(gameId);
  }
}
