export interface Games {
  [key: string]: Game;
}

export interface DrinkOptions {
  amountPerDrink?: number;
  nameOfKneipeOrWirt?: string;
  payPalDonationLink?: string;
}

export interface Game {
  id: string;
  name?: string;
  status: 'created' | 'running' | 'finished';
  players: Players;
  loserPlayerId?: string;
  createdAt: number;
  createdBy: string;
  payPalDonationLink?: string;
  nameOfKneipeOrWirt?: string;
  amountPerDrink: number;
  url?: string;
  chat?: ChatMessage[];
  turnNumber: number;
  startingPlayerId?: string;
  currentPlayerId?: string;
  isPayed: boolean;
}

export interface Players {
  [key: string]: Player;
}

export interface Player {
  id: string;
  playerCount: number;
  name: string;
  active: boolean;
  turns?: Turns;
  initialScore?: number;
  currentScore?: number;
}

export interface Turns {
  [key: string]: Turn;
}

export interface Turn {
  turnNumber: number;
  dices: Dices;
  currentScore: number;
  isRolling: boolean;
  attacksWith?: number;
  attackingPlayerId?: string;
}

export interface Dices {
  [key: string]: Dice;
}

export type DiceValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Dice {
  value: DiceValue;
  picked: boolean;
  pickedCount: number;
  chosen: boolean;
}

interface ChatMessage {
  sentAt: number;
  sentFrom: Player;
}
