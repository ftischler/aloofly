import { Dice } from '@aloofly/mws30-models';

export function calculateInitialResult(dices: Dice[]): number {
  return dices.reduce((acc, {value}) => acc + value, 0);
}
