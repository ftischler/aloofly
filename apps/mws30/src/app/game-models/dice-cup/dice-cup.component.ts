import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { Dice, Dices, Player } from '@aloofly/mws30-models';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { rollDices } from '../../common/roll-dices';
import { createDices } from '../../common/create-dices';
import { objectToKeyValues } from '../../common/object-to-key-values';
import { keyValuesToObject } from '../../common/key-values-to-object';
import { randomDiceValue } from '../../common/random-dice-value';
import { resetDices } from '../../common/reset-dices';
import { KeyValue } from '@angular/common';

// one second
const DICE_ROLL_DELAY = 1.5 * 1000;
const DICE_SHOW_DELAY = 0;

@Component({
  selector: 'mws30-dice-cup',
  templateUrl: './dice-cup.component.html',
  styleUrls: ['./dice-cup.component.scss'],
  exportAs: 'diceCup',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiceCupComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isFirstTurn = false;
  @Input() dices: Dices = createDices();
  @Input() attack?: number;
  @Input() attackOn?: Player;
  @Output() diceCupResult = new EventEmitter<Dices>();
  @Output() dicePicked = new EventEmitter<Dices>();

  @Output() isRolling = new EventEmitter<boolean>();
  @Output() roundClosed = new EventEmitter<Dices>();

  rolledDices$ = new ReplaySubject<Dices | undefined>(1);

  private diceRoller = new Subject<Dices>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.diceRoller.pipe(
      tap(() => this.isRolling.next(true)),
      delay(DICE_ROLL_DELAY),
      map(rollDices),
      tap(dices => this.rolledDices$.next(dices)),
      delay(DICE_SHOW_DELAY),
      tap(() => this.isRolling.next(false)),
      takeUntil(this.destroy$)
    ).subscribe(this.diceCupResult);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rolledDices$.next(this.dices);
  }

  rollDices(): void {
    this.diceRoller.next(this.dices || createDices());
  }

  pickDice(dice: Dice, diceKey: string): void {
    if (this.attack && dice.value !== this.attack) {
      return;
    }

    const pickedDice: Dice = {
      ...dice,
      picked: !dice.picked
    };

    const newDices: Dices = {
      ...this.dices,
      [diceKey]: pickedDice
    };

    this.dicePicked.next(newDices);
  }

  keepPickedDices(dices: Dices, rollDelay: boolean = true): void {
    const newDices: Dices = keyValuesToObject(
      objectToKeyValues(dices).map(({ key, value: dice }) => ({
        key,
        value: {
          ...dice,
          chosen: dice.picked
        }
      }))
    );

    if (rollDelay) {
      this.diceCupResult.next(resetDices(newDices));
      this.diceRoller.next(newDices);
    } else {
      this.diceCupResult.next(newDices);
      this.rolledDices$.next(newDices);
    }
  }

  takePickedDicesAndCloseRound(dices: Dices): void {
    const unChosenDices: Array<KeyValue<string, Dice>> = objectToKeyValues(dices)
      .filter(({ value }) => !value.chosen);

    const newDices: Dices = keyValuesToObject(unChosenDices.map(({ key, value: dice }) => {
      return {
        key,
        value: {
          ...dice,
          picked: true,
          chosen: true
        }
      };
    }));

    this.rolledDices$.next(newDices);
    this.roundClosed.next(newDices);
  }

  takePickedAttackDicesAndCloseRound(dices: Dices, attack: number): void {
    const unChosenDices: Array<KeyValue<string, Dice>> = objectToKeyValues(dices)
      .filter(({ value }) => !value.chosen && value.value === attack);

    const newDices: Dices = keyValuesToObject(unChosenDices.map(({ key, value: dice }) => {
      return {
        key,
        value: {
          ...dice,
          picked: true,
          chosen: true
        }
      };
    }));

    this.rolledDices$.next(newDices);
    this.roundClosed.next(newDices);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
