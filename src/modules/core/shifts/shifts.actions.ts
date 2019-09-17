import { FETCH, RECEIVED, FetchShiftsAction, ReceivedShiftsAction } from './shifts.actionTypes';
import { ShiftMap } from './shifts.stateTypes';

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