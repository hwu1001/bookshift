// TODO - Rename these action types to be specific to fetching all shifts
export const FETCH = 'shifts/FETCH';
export const RECEIVED = 'shifts/RECEIVED';
export const BOOK = 'shifts/BOOK';
export const BOOK_RECEIVED = 'shifts/BOOK_RECEIVED';
import { ShiftsState, SingleShiftState } from './shifts.stateTypes';

export interface FetchShiftsAction {
  type: typeof FETCH,
  payload: ShiftsState
}

export interface ReceivedShiftsAction {
  type: typeof RECEIVED,
  payload: ShiftsState
}

export interface BookShiftAction {
  type: typeof BOOK,
  payload: SingleShiftState
}

export interface ReceivedBookShiftAction {
  type: typeof BOOK_RECEIVED,
  payload: SingleShiftState
}

export type ShiftActionTypes = FetchShiftsAction | ReceivedShiftsAction | BookShiftAction | ReceivedBookShiftAction;
