import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, StoreRouterConnectingModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
