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
import { Dice, Dices } from '@aloofly/mws30-models';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { rollDices } from '../../common/roll-dices';
import { createDices } from '../../common/create-dices';
import { objectToKeyValues } from '../../common/object-to-key-values';
import { keyValuesToObject } from '../../common/key-values-to-object';

// one second
const DICE_ROLL_DELAY = 1 * 1000;
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
  @Output() diceCupResult = new EventEmitter<Dices>();
  @Output() dicePicked = new EventEmitter<Dices>();

  rolledDices$ = new ReplaySubject<Dices | undefined>(1);

  isRolling$ = new Subject<boolean>();

  private diceRoller = new Subject<Dices>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.diceRoller.pipe(
      tap(() => this.isRolling$.next(true)),
      delay(DICE_ROLL_DELAY),
      map(rollDices),
      tap(dices => this.rolledDices$.next(dices)),
      delay(DICE_SHOW_DELAY),
      tap(() => this.isRolling$.next(false)),
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

  keepChosenDices(dices: Dices): void {
    const newDices: Dices = keyValuesToObject(
      objectToKeyValues(dices).map(({ key, value }) => ({
        key,
        value: {
          ...value,
          chosen: value.picked
        }
      }))
    );
    this.diceCupResult.next(newDices);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
