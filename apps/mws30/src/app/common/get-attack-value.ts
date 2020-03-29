import { Dices } from '@aloofly/mws30-models';

export function getAttackValue(dices: Dices): number {
  return Object.values(dices).reduce((acc, curr) => {
    return curr.chosen ? acc + curr.value : acc;
  }, 0);
}
