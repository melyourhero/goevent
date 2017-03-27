import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';

export const basicMiddleware = [
  rootReducer,
];

export const middlewaresToApply = [
  thunk,
  routerMiddleware(browserHistory),
];
