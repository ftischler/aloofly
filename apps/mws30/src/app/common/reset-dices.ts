import { Dices } from '@aloofly/mws30-models';
import { randomDiceValue } from './random-dice-value';

export function resetDices(dices: Dices): Dices {
  let newDices: Dices = {};

  for (const key in dices) {
    if (dices.hasOwnProperty(key)) {
      newDices = {
        ...newDices,
        [key]: {
          ...dices[key],
          value: (dices[key].picked || dices[key].chosen) ? dices[key].value : 0
        }
      };
    }
  }

  return newDices;
}
