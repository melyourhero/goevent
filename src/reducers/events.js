import Immutable from 'immutable';

import {
    EVENTS_FETCH,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILURE,
} from '../constants/ActionTypes';

const initialState = Immutable.fromJS({
  events: [],
  isFetching: false,
  eventsLoaded: false,
  errorMessage: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_FETCH:
      return state.merge(action.payload);

    case GET_EVENTS_SUCCESS:
      return state.merge(action.payload);

    case GET_EVENTS_FAILURE:
      return state.merge(action.payload);

    default:
      return state;
  }
};
