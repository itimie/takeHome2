import { SynchronizeState } from './models/synchronize.model';
import {createSelector, createFeatureSelector} from '@ngrx/store';

export interface AppState{
  readonly synchronize: SynchronizeState;
}

export const synchronizeSelector = createFeatureSelector<AppState, SynchronizeState>('synchronize');

export const millisecondSelector =  createSelector(
  synchronizeSelector,
  (state: SynchronizeState) => state.millisecond
);

