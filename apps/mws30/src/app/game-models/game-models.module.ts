import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './dice/dice.component';
import { NotepadComponent } from './notepad/notepad.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DiceComponent,
    NotepadComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DiceComponent,
    NotepadComponent
  ]
})
export class GameModelsModule { }
