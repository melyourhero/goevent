import { combineReducers } from 'redux-immutablejs';
import events from './events';
import routing from './routing';

const rootReducer = combineReducers({ eventState: events, routing });

export default rootReducer;
