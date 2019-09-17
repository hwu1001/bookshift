import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH } from './shifts.actionTypes'
import { receiveShifts } from './shifts.actions';
import { ShiftMap } from './shifts.stateTypes';
import { fetchShifts } from './shifts.api';

function* fetchShiftsGenerator () {
  const json = yield call(fetchShifts);
  let shifts: ShiftMap = {};
  for (const shift of json) {
    shifts[shift.id] = shift;
  }
  yield put(
    receiveShifts(shifts)
  );
}

export function* shiftsFetchWatcher() {
  yield takeLatest(FETCH, fetchShiftsGenerator);
}