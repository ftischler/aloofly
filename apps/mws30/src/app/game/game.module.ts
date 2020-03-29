import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { MatListModule } from '@angular/material/list';
import { GameJoinComponent } from './game-join/game-join.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { GameTableComponent } from './game-table/game-table.component';
import { FirstRoundComponent } from './game-steps/first-round/first-round.component';
import { MatSelectModule } from '@angular/material/select';
import { GameModelsModule } from '../game-models/game-models.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegularRoundComponent } from './game-steps/regular-round/regular-round.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GameComponent,
    GameJoinComponent,
    GameTableComponent,
    FirstRoundComponent,
    RegularRoundComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    GameModelsModule,
    ClipboardModule,
    MatIconModule
  ]
})
export class GameModule {}
