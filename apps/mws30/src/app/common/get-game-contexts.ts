import { GameContext, Games, Player } from '@aloofly/mws30-models';

export function getGameContexts(games: Games, playerId?: string): GameContext[] {
  if (!playerId) {
    return [];
  }

  return Object.values(games).reduce((acc, curr) => {
    const player: Player | undefined = curr.players[playerId];
    if (player) {
      const ctx: GameContext = {
        game: curr,
        player
      };

      return [...acc, ctx];
    } else {
      return acc;
    }
  }, [] as GameContext[]);
}
