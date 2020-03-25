import { Dices } from '@aloofly/mws30-models';

export function calculateInitialResult(dices: Dices): number {
  return Object.values(dices).reduce((acc, {value}) => acc + value, 0);
}
