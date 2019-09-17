export const FETCH = 'shifts/FETCH';
export const RECEIVED = 'shifts/RECEIVED';
import { ShiftsState } from './shifts.stateTypes';

export interface FetchShiftsAction {
  type: typeof FETCH,
  payload: ShiftsState
}

export interface ReceivedShiftsAction {
  type: typeof RECEIVED,
  payload: ShiftsState
}

export type ShiftActionTypes = FetchShiftsAction | ReceivedShiftsAction;
