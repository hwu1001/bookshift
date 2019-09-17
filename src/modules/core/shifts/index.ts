import * as actions from './shifts.actions';
import * as stateTypes from './shifts.stateTypes';
import { shiftsReducer as reducer, initialState } from './shifts.reducer';
import * as saga from './shifts.sagas';
import { NAME } from './shifts.constants';

export {
  actions,
  reducer,
  initialState,
  saga,
  stateTypes,
  NAME
}
