import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

import { basicMiddleware, middlewaresToApply } from './commonMiddlewares';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

export default function (initialState) {
  const store = createStore(
  ...basicMiddleware,
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewaresToApply, createLogger())
  )
);

  return store;
}
