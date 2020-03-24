import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Game, Games, Player, Players } from '@aloofly/mws30-models';
import { createGame } from '../common/create-game';

import 'firebase/database';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { DB_KEY } from '../common/db-key';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private angularFireDatabase: AngularFireDatabase) {
  }

  getPlayer(gameId: string, playerId: string): Observable<Player> {
    return this.getGame(gameId).pipe(
      map(game => game.players[playerId])
    );
  }

  getGame(gameId: string): Observable<Game> {
    return this.angularFireDatabase.object<Game>(`/${DB_KEY}/${gameId}`).valueChanges().pipe(
      filter<Game>(Boolean)
    );
  }

  async createGame(gameId: string, player: Player): Promise<void> {
    const game: Partial<Game> = createGame(gameId, player);

    await this.angularFireDatabase.object(DB_KEY).update({
      [gameId]: game
    });
  }

  async joinGame(gameId: string, player: Player): Promise<void> {
    const playerCount = await this.angularFireDatabase
      .object<Players>(`/${DB_KEY}/${gameId}/players`)
      .valueChanges()
      .pipe(
        filter<Players>(Boolean),
        map(players => Object.keys(players).length),
        take(1)
      )
      .toPromise();

    await this.angularFireDatabase
      .object<Player>(`/${DB_KEY}/${gameId}/players/${player.id}`)
      .update({...player, playerCount});
  }

  async startGame(gameId: string): Promise<void> {
    await this.angularFireDatabase
      .object<Game>(`/${DB_KEY}/${gameId}`)
      .update({status: 'running'});
  }
}
