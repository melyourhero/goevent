import { EVENTS_FETCH, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE } from '../constants/ActionTypes';
import { GOEVENT_API_EVENTS } from '../constants/Api';

export const requestEvents = () => ({
  type: EVENTS_FETCH,
  payload: {
    isFetching: true,
  },
});

export const eventsFetchSuccess = (response) => ({
  type: GET_EVENTS_SUCCESS,
  payload: {
    events: response.events,
    isFetching: false,
    eventsLoaded: true,
  },
});

export const eventsFetchFail = (errorMessage) => ({
  type: GET_EVENTS_FAILURE,
  payload: {
    eventsLoaded: false,
    isFetching: false,
    message: errorMessage,
  },
});

export const fetchEvents = () => (dispatch) => {
  const options = {
    method: 'GET',
  };

  dispatch(requestEvents());

  return fetch(GOEVENT_API_EVENTS, options).
         then((response) => response.json()).
         then((json) => dispatch(eventsFetchSuccess(json))).
         catch((error) => dispatch(eventsFetchFail(error)));
};
