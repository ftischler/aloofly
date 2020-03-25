import { Dice } from '@aloofly/mws30-models';
import { randomDiceValue } from './random-dice-value';

export function rollDices(dices: Dice[]): Dice[] {
  return dices.map(dice => ({
    ...dice,
    value: randomDiceValue()
  }));
}
