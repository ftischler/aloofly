import { Dice, Dices } from '@aloofly/mws30-models';
import { createRandomId } from './create-random-id';

export function createDice(): Dice {
  return {
    picked: false,
    value: 0
  };
}

export function createDices(): Dices {
  return ({
    [createRandomId()]: createDice(),
    [createRandomId()]: createDice(),
    [createRandomId()]: createDice(),
    [createRandomId()]: createDice(),
    [createRandomId()]: createDice(),
    [createRandomId()]: createDice()
  });
}
