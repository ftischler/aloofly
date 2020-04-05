import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules.component';
import { RulesRoutingModule } from './rules-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RulesComponent
  ],
  exports: [
    RulesComponent
  ],
  imports: [
    CommonModule,
    RulesRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class RulesModule { }
