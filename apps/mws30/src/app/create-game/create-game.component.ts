import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createRandomId } from '../common/create-random-id';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameService } from '../services/game.service';
import { DrinkOptions, Player } from '@aloofly/mws30-models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mws30-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent {
  formGroup = new FormGroup({
    roomName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    playerName: new FormControl('', [
      Validators.maxLength(20),
      Validators.required
    ]),
    support: new FormControl(),
    nameOfKneipeOrWirt: new FormControl('', Validators.maxLength(20)),
    amountPerDrink: new FormControl(''),
    payPalDonationLink: new FormControl('')
  });

  constructor(private gameService: GameService, private router: Router, private matSnackBar: MatSnackBar) {}

  async createGame(): Promise<void> {
    const gameId: string = createRandomId();
    const { playerName, roomName: name } = this.formGroup.value;
    const player: Player = this.gameService.createPlayer(playerName);

    const {
      amountPerDrink,
      nameOfKneipeOrWirt,
      payPalDonationLink
    }: DrinkOptions = this.formGroup.value;

    const drinkOptions: DrinkOptions | undefined =
      amountPerDrink && nameOfKneipeOrWirt && payPalDonationLink
        ? {
            amountPerDrink,
            nameOfKneipeOrWirt,
            payPalDonationLink
          }
        : undefined;

    if (this.formGroup.value.support && !drinkOptions) {
      this.matSnackBar.open('Du musst alle Eingabefelder ausfüllen um deine Kneipe zu unterstürzen.', 'Okay', {
        duration: 2000
      });
    }

    if (this.formGroup.valid) {
      await this.gameService.createGame(gameId, player, name, drinkOptions);
      await this.router.navigate([gameId, player.id]);
    }
  }
}
