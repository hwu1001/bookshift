import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as main from '../main';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  main.reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(main.rootSaga);