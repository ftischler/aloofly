export interface Games {
  [key: string]: Game;
}

export interface Game {
  id: string;
  status: 'created' | 'running' | 'finished';
  players: Players;
  loser?: Player;
  createdAt: number;
  createdBy: Player;
  payPalDonationLink?: string;
  url?: string;
  chat?: ChatMessage[];
  turnNumber: number;
  currentPlayer?: Player;
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
  dices: Dice[];
  currentScore: number;
  attacks?: Attack[];
}

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface Dice {
  value: DiceValue;
  picked: boolean;
}

export interface Attack {
  target: Player;
  amount: number;
}

interface ChatMessage {
  sentAt: number;
  sentFrom: Player;
}

export type PartialWithId<T> = Partial<T> & {id: string};
