import { DiceValue } from '@aloofly/mws30-models';

export function randomDiceValue(): DiceValue {
  return Math.floor(Math.random() * 6) + 1 as DiceValue;
}
