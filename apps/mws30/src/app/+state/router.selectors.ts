import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface RouterState {
  router: RouterReducerState<any>;
}

const selectRouter = createFeatureSelector<RouterState, RouterReducerState<any>>('router');

export const { selectRouteParams } = getSelectors(selectRouter);
