import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectValuesPipe } from './object-values.pipe';
import { RemoveMyselfPipe } from './remove-myself.pipe';
import { IsAdminPipe } from './is-admin.pipe';
import { IsFirstRoundPipe } from './is-first-round.pipe';
import { HasScorePipe } from './has-score.pipe';
import { AllTurnsDonePipe } from './all-turns-done.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CurrentTurnPipe } from './current-turn.pipe';
import { PickedDicesPipe } from './picked-dices.pipe';
import { UnpickedDicesPipe } from './unpicked-dices.pipe';
import { TurnsRunningPipe } from './turns-running.pipe';

@NgModule({
  declarations: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe,
    AllTurnsDonePipe,
    CurrentTurnPipe,
    PickedDicesPipe,
    UnpickedDicesPipe,
    TurnsRunningPipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe,
    AllTurnsDonePipe,
    CurrentTurnPipe,
    PickedDicesPipe,
    UnpickedDicesPipe,
    TurnsRunningPipe
  ]
})
export class SharedModule { }
