import { ActionReducer, Action, createAction, props } from '@ngrx/store';
import { SynchronizeState } from './../models/synchronize.model'
import { InitialState } from '@ngrx/store/src/models';
import * as SynchronizeActions from './../actions/synchronize.actions';

export const SYNCHRONIZE = 'SYNCHRONIZE';

export const initialState: SynchronizeState = {
  millisecond : new Date().getTime()
}

export function synchronizeReducer(state: SynchronizeState = initialState , action: SynchronizeActions.Actions): SynchronizeState {
	switch (action.type) {
		case SynchronizeActions.SYNCHRONIZE_DIGITAL:
    case SynchronizeActions.SYNCHRONIZE_ANALOG:
      return Object.assign({},state,{millisecond: action.payload.millisecond});
		default:
			return state;
	}
}