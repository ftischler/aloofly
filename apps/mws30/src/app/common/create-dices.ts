import { Dice, Dices } from '@aloofly/mws30-models';
import { randomDiceValue } from './random-dice-value';
import { createRandomId } from './create-random-id';

export function createDice(): Dice {
  return {
    picked: false,
    value: randomDiceValue()
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
