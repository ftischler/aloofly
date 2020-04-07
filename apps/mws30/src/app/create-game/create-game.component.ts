import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { createRandomId } from '../common/create-random-id';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { GameService } from '../services/game.service';
import { DrinkOptions, PaymentOption, Player } from '@aloofly/mws30-models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil
} from 'rxjs/operators';

interface PaymentOptionFormControl extends FormControl {
  value: PaymentOption;
  patchValue: (
    paymentOption: PaymentOption,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ) => void;
}

function positiveNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  return +control.value > 0 ? null : { positiveNumberError: true };
}

@Component({
  selector: 'mws30-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  formGroup = new FormGroup({
    roomName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20)
    ]),
    playerName: new FormControl('', [
      Validators.maxLength(20),
      Validators.required
    ]),
    support: new FormControl(false),
    nameOfKneipeOrWirt: new FormControl('', Validators.maxLength(20)),
    amountPerDrink: new FormControl(0.5, positiveNumberValidator),
    paymentOption: new FormControl('payPalMe' as PaymentOption),
    payPalLink: new FormControl('')
  });

  paymentOptions: { value: PaymentOption; viewValue: string }[] = [
    {
      value: 'payPalMe',
      viewValue: 'PayPal.me'
    },
    {
      value: 'payPalMoneyPool',
      viewValue: 'PayPal MoneyPool'
    }
  ];

  constructor(
    private gameService: GameService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const payPalLinkControl: FormControl = this.formGroup.get(
      'payPalLink'
    ) as FormControl;
    const paymentOptionControl: PaymentOptionFormControl = this.formGroup.get(
      'paymentOption'
    ) as PaymentOptionFormControl;

    payPalLinkControl.valueChanges
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value: string) => {
        if (value.includes('paypal.me')) {
          paymentOptionControl.patchValue('payPalMe');
        } else if (value.includes('/pools/')) {
          paymentOptionControl.patchValue('payPalMoneyPool');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  async createGame(withPayment: boolean = false): Promise<void> {
    const gameId: string = createRandomId();
    const { playerName, roomName: name } = this.formGroup.value;
    const player: Player = this.gameService.createPlayer(playerName);

    const {
      amountPerDrink,
      nameOfKneipeOrWirt,
      paymentOption,
      payPalLink
    }: DrinkOptions = this.formGroup.value;

    const drinkOptions: DrinkOptions | undefined =
      amountPerDrink && nameOfKneipeOrWirt && payPalLink
        ? {
            amountPerDrink: withPayment ? amountPerDrink : 0,
            nameOfKneipeOrWirt,
            payPalLink,
            paymentOption: withPayment ? paymentOption : 'none'
          }
        : undefined;

    if (this.formGroup.value.support && !drinkOptions) {
      this.matSnackBar.open(
        'Du musst alle Eingabefelder ausfüllen um deine Kneipe zu unterstürzen.',
        'Okay',
        {
          duration: 2000
        }
      );
    }

    if (this.formGroup.valid) {
      await this.gameService.createGame(gameId, player, name, drinkOptions);
      await this.router.navigate([gameId, player.id]);
    }
  }
}
