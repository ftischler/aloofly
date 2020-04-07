import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './dice/dice.component';
import { NotepadComponent } from './notepad/notepad.component';
import { SharedModule } from '../shared/shared.module';
import { DiceCupComponent } from './dice-cup/dice-cup.component';
import { DiceCupViewDialogComponent } from './dialogs/dice-cup-view-dialog/dice-cup-view-dialog.component';
import { DiceCupViewComponent } from './dice-cup-view/dice-cup-view.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { QrCodeDialogComponent } from './dialogs/qr-code-dialog/qr-code-dialog.component';

@NgModule({
  declarations: [
    DiceComponent,
    NotepadComponent,
    DiceCupComponent,
    DiceCupViewComponent,
    DiceCupViewDialogComponent,
    QrCodeDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule
  ],
  exports: [
    DiceComponent,
    NotepadComponent,
    DiceCupComponent,
    DiceCupViewComponent,
    DiceCupViewDialogComponent
  ]
})
export class GameModelsModule {}
