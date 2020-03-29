import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';

const routes: Routes = [
  {
    path: '',
    component: CreateGameComponent
  },
  {
    path: '',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
