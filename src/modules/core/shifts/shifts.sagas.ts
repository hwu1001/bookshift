import { put, takeLatest, call, take } from 'redux-saga/effects';
import { FETCH, BOOK } from './shifts.actionTypes'
import { receiveShifts, receiveBookShift } from './shifts.actions';
import { ShiftMap } from './shifts.stateTypes';
import { fetchShifts, bookShift } from './shifts.api';

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

function* bookShiftGenerator (shiftId: string) {
  const json = yield call(bookShift, shiftId);
  // TODO - Handle errors from API like 4xx requests
  if (json.error) {
    // handle error
  } else {
    yield put(
      receiveBookShift(json)
    );
  }
}

export function* watchBookShift() {
  const { shift } = yield take(BOOK);
  yield takeLatest(BOOK, bookShiftGenerator, shift.id);
}