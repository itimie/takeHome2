import { synchronizeReducer, initialState } from "./synchronize.reducer";
import {SynchronizeAnalogAction, SynchronizeDigitalAction} from 
"./../actions/synchronize.actions";
import {SynchronizeState} from './../models/synchronize.model';

//could be improved;
describe('Synchronize Reducer', () => {

  it('should return initial state for unknown action', () => {
    const action = {} as any;

    const result = synchronizeReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should return updated state for  sync digital action', () =>{
    const action = new SynchronizeAnalogAction({millisecond: 12});

    const result = synchronizeReducer(initialState, action);

    expect(result).toEqual({millisecond: 12} as SynchronizeState);
  });

  it('should return updated state for sync analog action', ()=> {
    const action = new SynchronizeDigitalAction({millisecond: 10});

    const result = synchronizeReducer(initialState, action);

    expect(result).toEqual({millisecond: 10} as SynchronizeState);
  });

});
