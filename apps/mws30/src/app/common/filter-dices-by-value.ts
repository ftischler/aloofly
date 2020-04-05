import { Dices } from '@aloofly/mws30-models';

export function filterDicesByValue(dices: Dices, filterValue: number): Dices {
  let filteredDices: Dices = {};

  for (const key in dices) {
    if (dices.hasOwnProperty(key) && dices[key].value === filterValue) {
      filteredDices = {
        ...filteredDices,
        [key]: dices[key]
      };
    }
  }

  return filteredDices;
}
