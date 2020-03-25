import { Player } from '@aloofly/mws30-models';
import { createRandomId } from './create-random-id';

export function createPlayer(name: string): Player {
  return {
    active: false,
    id: createRandomId(),
    name,
    playerCount: 0
  };
}
