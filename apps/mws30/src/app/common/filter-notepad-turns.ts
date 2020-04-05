import { Turn } from '@aloofly/mws30-models';

export function filterNodePadTurns(turns: Turn[]): Turn[] {
  return turns.reduce((acc, curr, index) => {
    const lastItem: Turn | undefined = acc[acc.length - 1];
    const isLastTurn = index === turns.length - 1;

    if (isLastTurn && curr.currentScore === 0) {
      return [...acc, curr];
    }

    if (lastItem && lastItem.currentScore === curr.currentScore || curr.currentScore === 0) {
      return acc;
    }

    return [...acc, curr];
  }, [] as Turn[]);
}
