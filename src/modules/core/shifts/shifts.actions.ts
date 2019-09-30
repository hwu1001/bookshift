import { FETCH, RECEIVED, BOOK, FetchShiftsAction, ReceivedShiftsAction, BookShiftAction } from './shifts.actionTypes';
import { ShiftMap, Shift } from './shifts.stateTypes';

export const fetchShifts = (): FetchShiftsAction => {
  return {
    type: FETCH,
    payload: {
      shifts: {},
      loading: true
    }
  }
};

export const receiveShifts = (shiftsMap: ShiftMap): ReceivedShiftsAction => {
  return {
    type: RECEIVED,
    payload: {
      shifts: shiftsMap,
      loading: false
    }
  }
}

export const bookShift = (shiftId: string): BookShiftAction => {
  return {
    type: BOOK,
    payload: {
      loading: true,
      shift: {
        id: shiftId,
        area: "",
        booked: false,
        startTime: 0,
        endTime: 0
      }
    }
  }
};

export const receiveBookShift = (shift: Shift): BookShiftAction => {
  return {
    type: BOOK,
    payload: {
      shift: shift,
      loading: false
    }
  }
};