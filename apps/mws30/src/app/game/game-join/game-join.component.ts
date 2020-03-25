import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPlayer } from '../../common/create-player';
import { Game } from '@aloofly/mws30-models';

@Component({
  selector: 'mws30-game-join',
  templateUrl: './game-join.component.html',
  styleUrls: ['./game-join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameJoinComponent {
  gameId$: Observable<string> = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get('gameId')!),
    filter<string>(Boolean)
  );

  game$: Observable<Game> = this.gameId$.pipe(
    switchMap(gameId => this.gameService.getGame(gameId)),
    filter<Game>(Boolean)
  );

  formGroup = new FormGroup({
    playerName: new FormControl('', Validators.maxLength(20))
  });

  constructor(private activatedRoute: ActivatedRoute, private gameService: GameService, private router: Router) { }

  async submit(gameId: string): Promise<void> {
    const { playerName } = this.formGroup.value;
    const player = createPlayer(playerName);

    await this.gameService.joinGame(gameId, player);

    await this.router.navigate(['game', gameId, player.id]);
  }
}
