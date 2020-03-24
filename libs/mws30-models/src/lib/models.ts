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
  chat: ChatMessage[];
  round: number;
  currentTurn?: Player;
}

export interface Players {
  [key: string]: Player;
}

export interface Player {
  id: string;
  playerCount: number;
  name: string;
  active: boolean;
  moves: Move[];
  initialScore?: number;
  currentScore?: number;
}

export interface Move {
  moveNumber: number;
  dices: Dices;
  currentScore: number;
  attacks: Attack[];
}

export interface Dices {
  [key: string]: Dice;
}

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface Dice {
  id: string;
  value?: DiceValue;
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
