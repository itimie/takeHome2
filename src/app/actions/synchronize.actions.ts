import {Action} from '@ngrx/store';
import {SynchronizeState} from './../models/synchronize.model';

export const SYNCHRONIZE_DIGITAL = '[SYNCHRONIZE] With Digital Time';
export const SYNCHRONIZE_ANALOG = '[SYNCHRONIZE] With Analog Time'

export class SynchronizeDigitalAction implements Action {
  readonly type = SYNCHRONIZE_DIGITAL;
  constructor(public payload: SynchronizeState) { }
}

export class SynchronizeAnalogAction implements Action {
  readonly type = SYNCHRONIZE_ANALOG;
  constructor(public payload: SynchronizeState) { }
}

export type Actions = SynchronizeDigitalAction | SynchronizeAnalogAction;