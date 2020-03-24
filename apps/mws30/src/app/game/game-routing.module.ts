import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { GameJoinComponent } from './game-join/game-join.component';

const routes: Routes = [
  {
    path: ':gameId',
    component: GameJoinComponent
  },
  {
    path: ':gameId/:playerId',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
