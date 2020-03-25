import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateGameComponent } from './create-game/create-game.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { GAME_CONTEXT_PROVIDER } from './common/game-context';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './effects/game.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const firebaseConfig = {
  apiKey: "AIzaSyCuSY8pKvqc7RJjgFptxGXeRPb5kXiefz4",
  authDomain: "mws30-c74b1.firebaseapp.com",
  databaseURL: "https://mws30-c74b1.firebaseio.com",
  projectId: "mws30-c74b1",
  storageBucket: "mws30-c74b1.appspot.com",
  messagingSenderId: "880463604190",
  appId: "1:880463604190:web:329d414cf0928beb6e554f"
};

@NgModule({
  declarations: [AppComponent, CreateGameComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [GAME_CONTEXT_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {}
