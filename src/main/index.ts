import { combineReducers } from 'redux'
import { all, call } from 'redux-saga/effects';
import * as shifts from '../modules/core/shifts';

export const reducer = combineReducers({
  [shifts.NAME]: shifts.reducer
});

export function* rootSaga() {
  yield all([
    call(shifts.saga.shiftsFetchWatcher),
  ]);
}

export type AppState = ReturnType<typeof reducer>;