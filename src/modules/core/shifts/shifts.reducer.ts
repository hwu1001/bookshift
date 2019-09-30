import { FETCH, RECEIVED, BOOK, BOOK_RECEIVED, ShiftActionTypes } from './shifts.actionTypes';
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
    case BOOK:
      return { ...state, ...action.payload};
    case BOOK_RECEIVED:
      const shiftId = action.payload.shift.id;
      return {
        shifts: {
          ...state.shifts,
          shiftId: action.payload.shift
        },
        loading: action.payload.loading 
      };
    default:
      return state;
  }
};