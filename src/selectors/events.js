// import Immutable from 'immutable';
import { createSelector } from 'reselect';

const getEvents = (state) => state.getIn(['eventState', 'events']);

export const getEventsFetching = (state) => state.getIn(['eventState', 'isFetching']);

export const getEventsStatusLoading = (state) => state.getIn(['eventState', 'eventsLoaded']);

export const getEventsLoadingError = (state) => state.getIn(['eventState', 'errorMessage']);

export const getFilteredEventsByLocation = createSelector(
    [getEvents],
    (events) => events.filter((event) => event.get('eventLocation'))
);

