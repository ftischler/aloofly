import { Dice, DiceValue } from '@aloofly/mws30-models';
import { randomDiceValue } from './random-dice-value';

export function createDices(): Dice[] {
  return new Array(6).fill(0).map(() => {
    const dice: Dice = {
      picked: false,
      value: randomDiceValue()
    };
    return dice;
  });
}
