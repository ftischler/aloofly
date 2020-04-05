import { Player } from '@aloofly/mws30-models';
import { createRandomId } from './create-random-id';

export function createPlayer(name: string, id: string = createRandomId()): Player {
  return {
    active: false,
    id,
    name,
    playerCount: 0
  };
}
