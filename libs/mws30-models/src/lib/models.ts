export interface Games {
  [key: string]: Game;
}

export interface Game {
  id: string;
  status: 'created' | 'running' | 'finished';
  players: Players;
  loserPlayerId?: string;
  createdAt: number;
  createdBy: string;
  payPalDonationLink?: string;
  url?: string;
  chat?: ChatMessage[];
  turnNumber: number;
  startingPlayerId?: string;
  currentPlayerId?: string;
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
  attacks?: Attacks;
}

export interface Dices {
  [key: string]: Dice;
}

export type DiceValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Dice {
  value: DiceValue;
  picked: boolean;
  chosen: boolean;
}

export interface Attacks {
  [key: string]: Attack;
}

export interface Attack {
  target: Player;
  amount: number;
}

interface ChatMessage {
  sentAt: number;
  sentFrom: Player;
}
