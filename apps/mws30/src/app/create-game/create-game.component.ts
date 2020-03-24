import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createRandomId } from '../common/create-random-id';
import { FormControl, FormGroup } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Player } from '@aloofly/mws30-models';
import { createPlayer } from '../common/create-player';
import { Router } from '@angular/router';

@Component({
  selector: 'mws30-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent {
  formGroup = new FormGroup({
    playerName: new FormControl('')
  });

  constructor(private gameService: GameService, private router: Router) { }

  async createGame(): Promise<void> {
    const gameId: string = createRandomId();
    const { playerName } = this.formGroup.value;
    const player: Player = createPlayer(playerName);

    await this.gameService.createGame(gameId, player);

    await this.router.navigate(['/game', gameId, player.id]);
  }
}
