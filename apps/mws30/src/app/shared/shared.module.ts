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
import { TurnsRunningPipe } from './turns-running.pipe';
import { CurrentTurnIdPipe } from './current-turn-id';
import { CurrentPlayerPipe } from './current-player.pipe';
import { ObjectKeysPipe } from './object-keys.pipe';
import { HasRolledPipe } from './has-rolled.pipe';
import { ChosenDicesPipe } from './chosen-dices.pipe';
import { CanRollAgainPipe } from './can-roll-again.pipe';
import { TurnFinishedPipe } from './turn-finished.pipe';
import { AbsPipe } from './abs.pipe';
import { AllPickedPipe } from './all-picked.pipe';
import { AttackedPlayerPipe } from './attacked-player.pipe';
import { DiceValuesPipe } from './dice-values.pipe';
import { FilterDicesPipe } from './filter-dices.pipe';
import { AllChosenPipe } from './all-chosen.pipe';
import { FilterNotepadTurnsPipe } from './filter-notepad-turns.pipe';

@NgModule({
  declarations: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe,
    AllTurnsDonePipe,
    CurrentTurnPipe,
    TurnsRunningPipe,
    CurrentTurnIdPipe,
    CurrentPlayerPipe,
    ObjectKeysPipe,
    HasRolledPipe,
    ChosenDicesPipe,
    CanRollAgainPipe,
    TurnFinishedPipe,
    AbsPipe,
    AllPickedPipe,
    AttackedPlayerPipe,
    DiceValuesPipe,
    FilterDicesPipe,
    AllChosenPipe,
    FilterNotepadTurnsPipe
  ],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe,
    AllTurnsDonePipe,
    CurrentTurnPipe,
    TurnsRunningPipe,
    CurrentTurnIdPipe,
    CurrentPlayerPipe,
    ObjectKeysPipe,
    HasRolledPipe,
    ChosenDicesPipe,
    CanRollAgainPipe,
    TurnFinishedPipe,
    AbsPipe,
    AllPickedPipe,
    AttackedPlayerPipe,
    DiceValuesPipe,
    FilterDicesPipe,
    AllChosenPipe,
    FilterNotepadTurnsPipe
  ]
})
export class SharedModule {}
