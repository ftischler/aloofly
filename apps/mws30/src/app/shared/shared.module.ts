import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectValuesPipe } from './object-values.pipe';
import { RemoveMyselfPipe } from './remove-myself.pipe';
import { IsAdminPipe } from './is-admin.pipe';
import { IsFirstRoundPipe } from './is-first-round.pipe';
import { HasScorePipe } from './has-score.pipe';

@NgModule({
  declarations: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe,
    IsFirstRoundPipe,
    HasScorePipe
  ]
})
export class SharedModule { }
