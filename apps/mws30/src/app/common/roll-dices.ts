import { Dices } from '@aloofly/mws30-models';
import { randomDiceValue } from './random-dice-value';

export function rollDices(dices: Dices): Dices {
  let newDices: Dices = {};

  for (const key in dices) {
    if (dices.hasOwnProperty(key)) {
      newDices = {
        ...newDices,
        [key]: {
          ...dices[key],
          value: randomDiceValue()
        }
      };
    }
  }

  return newDices;
}
