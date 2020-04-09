import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Game } from '@aloofly/mws30-models';
import { RouterFacade } from '../../+state/router.facade';

@Component({
  selector: 'mws30-game-join',
  templateUrl: './game-join.component.html',
  styleUrls: ['./game-join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameJoinComponent {
  gameId$: Observable<string> = this.routerFacade.routeParams$.pipe(
    filter(Boolean),
    map(({ gameId }) => gameId)
  );

  game$: Observable<Game> = this.gameId$.pipe(
    switchMap(gameId => this.gameService.getGame(gameId)),
    filter<Game>(Boolean)
  );

  formGroup = new FormGroup({
    playerName: new FormControl('', [
      Validators.maxLength(20),
      Validators.required
    ])
  });

  constructor(
    private routerFacade: RouterFacade,
    private gameService: GameService,
    private router: Router
  ) {}

  async submit(gameId: string): Promise<void> {
    const { playerName } = this.formGroup.value;

    const player = this.gameService.createPlayer(playerName);

    await this.gameService.joinGame(gameId, player);

    await this.router.navigate([gameId, player.id]);
  }
}
