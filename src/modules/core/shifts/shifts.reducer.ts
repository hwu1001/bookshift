import { FETCH, RECEIVED, ShiftActionTypes } from './shifts.actionTypes';
import { ShiftsState } from './shifts.stateTypes'

export const initialState: ShiftsState = {
  loading: true,
  shifts: {}
};

export const shiftsReducer = (state = initialState, action: ShiftActionTypes) => {
  switch (action.type) {
    case FETCH:
      return { ...state, ...action.payload };
    case RECEIVED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};