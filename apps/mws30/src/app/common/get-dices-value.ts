import { Dices } from '@aloofly/mws30-models';

export function getDicesValue(dices: Dices): number {
  return Object.values(dices).reduce((acc, {value}) => value + acc, 0);
}
