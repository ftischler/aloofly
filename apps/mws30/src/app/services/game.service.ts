import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Dices, Game, GameContext, Player, Players, Turn } from '@aloofly/mws30-models';
import { createGame } from '../common/create-game';

import 'firebase/database';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { DB_KEY } from '../common/db-key';
import { calculateInitialResult } from '../common/calculate-initial-result';
import { createDices } from '../common/create-dices';
import { objectToKeyValues } from '../common/object-to-key-values';
import { keyValuesToObject } from '../common/key-values-to-object';

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
      .update({ ...player, playerCount });
  }

  async setInitialResult({ player, game }: GameContext, dices: Dices): Promise<void> {
    const currentScore: number = calculateInitialResult(dices);

    await this.angularFireDatabase.object<Game>(`/${DB_KEY}/${game.id}`).update({
      currentPlayerId: player.id
    });

    await this.angularFireDatabase.object<Player>(`/${DB_KEY}/${game.id}/players/${player.id}`).update({
      currentScore
    });

    await this.angularFireDatabase.list<Turn>(`/${DB_KEY}/${game.id}/players/${player.id}/turns`).push(
      {
        dices,
        turnNumber: 0,
        currentScore,
        isRolling: false
      }
    );
  }

  async startGame(gameId: string): Promise<void> {
    await this.angularFireDatabase
      .object<Game>(`/${DB_KEY}/${gameId}`)
      .update({ status: 'running' });
  }

  async startRegularGame(game: Game, startingPlayerId: string): Promise<void> {
    const newGame: Game = {
      ...game,
      currentPlayerId: startingPlayerId,
      startingPlayerId: startingPlayerId
    };

    await this.angularFireDatabase
      .object<Game>(`/${DB_KEY}/${game.id}`)
      .update(newGame);

    await this.startTurn(newGame);
  }

  async startTurn(game: Game, playerId: string = game.startingPlayerId!): Promise<void> {
    const { turnNumber: oldTurnNumber } = game;

    const turnNumber = oldTurnNumber + 1;

    await this.angularFireDatabase
      .object<Game>(`/${DB_KEY}/${game.id}`)
      .update({
        currentPlayerId: playerId,
        turnNumber
      });

    await this.angularFireDatabase
      .object<Player>(`/${DB_KEY}/${game.id}/players/${playerId}`)
      .update({
        active: true
      });

    await this.angularFireDatabase.list<Turn>(`/${DB_KEY}/${game.id}/players/${playerId}/turns`).push({
      dices: createDices(),
      currentScore: 0,
      isRolling: false,
      turnNumber
    });
  }

  async saveIntermediateResult(ctx: GameContext, turnId: string, dices: Dices): Promise<void> {
    const { game, player } = ctx;

    await this.angularFireDatabase
      .list<Turn>(`/${DB_KEY}/${game.id}/players/${player.id}/turns`)
      .update(turnId, { dices });
  }

  async saveTurn(ctx: GameContext, currentTurnId: string, turn: Turn): Promise<void> {
    const { game, player } = ctx;

    await this.angularFireDatabase
      .list<Turn>(`/${DB_KEY}/${game.id}/players/${player.id}/turns`)
      .update(currentTurnId, turn);
  }

  async closeTurn(ctx: GameContext, turn: Turn): Promise<void> {
    const { game, player } = ctx;

    await this.angularFireDatabase
      .object<Player>(`/${DB_KEY}/${game.id}/players/${player.id}`)
      .update({ currentScore: turn.currentScore, active: false });
  }

  async closeAttack(ctx: GameContext, attackOn: Player, attackValue: number, turn: Turn): Promise<void> {
    const { game, player } = ctx;

    await this.angularFireDatabase
      .object<Player>(`/${DB_KEY}/${game.id}/players/${player.id}`)
      .update({ active: false });

    const newScore: number = attackOn.currentScore! - attackValue;

    await this.angularFireDatabase
      .object<Player>(`/${DB_KEY}/${game.id}/players/${attackOn.id}`)
      .update({
        currentScore: newScore
      });

    await this.angularFireDatabase
      .list<Turn>(`/${DB_KEY}/${game.id}/players/${attackOn.id}/turns`)
      .push({
        currentScore: newScore,
        turnNumber: -1,
        isRolling: false,
        dices: {}
      });

    if (newScore < 1) {
      await this.looseGame(game, attackOn);
    } else {
      await this.closeTurn(ctx, turn);
      await this.startTurn(game, attackOn.id);
    }
  }

  async looseGame(game: Game, player: Player): Promise<void> {
    await this.angularFireDatabase
      .object<Game>(`/${DB_KEY}/${game.id}`)
      .update({
        loserPlayerId: player.id
      });
  }

  async restartGame({game, player}: GameContext): Promise<void> {
    const gameId: string = game.id;
    const newGame: Partial<Game> = {
      ...createGame(gameId, player),
      players: keyValuesToObject(objectToKeyValues(game.players).map(({key, value}, index) => ({
        key,
        value: {
          ...value,
          currentScore: 0,
          turns: {},
          playerCount: index
        }
      })))
    };

    await this.angularFireDatabase.object(DB_KEY).update({
      [gameId]: newGame
    });
  }
}
