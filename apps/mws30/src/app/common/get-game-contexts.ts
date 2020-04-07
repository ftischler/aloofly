import { GameContext, Games } from '@aloofly/mws30-models';

export function getGameContexts(games: Games, playerId?: string, playerIds: string[] = []): GameContext[] {
  const allPlayerIds: string[] = [...(playerId ? [playerId] : []), ...playerIds ];

  return Object.values(games).reduce((acc, curr) => {
    const ctxs: GameContext[] = allPlayerIds.map(id => ({
      player: curr.players[id],
      game: curr
    }));

    return [...acc, ...ctxs.filter(({player}) => !!player)];
  }, [] as GameContext[]);
}
