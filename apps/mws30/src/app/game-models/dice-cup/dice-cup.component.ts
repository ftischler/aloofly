import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Dice } from '@aloofly/mws30-models';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { rollDices } from '../../common/roll-dices';
import { createDices } from '../../common/create-dices';

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
export class DiceCupComponent implements OnInit, OnDestroy {
  @Input() dices: Dice[] = createDices();
  @Output() diceCupResult = new EventEmitter<Dice[]>();

  dices$ = new ReplaySubject<Dice[]>(1);

  isRolling$ = new BehaviorSubject<boolean>(false);

  private diceRoller = new Subject<Dice[]>();

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.diceRoller.pipe(
      tap(() => this.isRolling$.next(true)),
      delay(DICE_ROLL_DELAY),
      map(rollDices),
      takeUntil(this.destroy$),
      tap(() => this.isRolling$.next(false)),
      tap(dices => this.dices$.next(dices)),
      delay(DICE_SHOW_DELAY),
    ).subscribe(this.diceCupResult);
  }

  rollDices(): void {
    this.diceRoller.next(this.dices);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
