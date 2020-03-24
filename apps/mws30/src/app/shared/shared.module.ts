import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectValuesPipe } from './object-values.pipe';
import { RemoveMyselfPipe } from './remove-myself.pipe';
import { IsAdminPipe } from './is-admin.pipe';

@NgModule({
  declarations: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectValuesPipe,
    RemoveMyselfPipe,
    IsAdminPipe
  ]
})
export class SharedModule { }
