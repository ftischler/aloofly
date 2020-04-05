import { Game, Player } from './models';

export interface GameContext {
  player: Player;
  game: Game;
}
