import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
import configureStore from '../store';
import * as actions from 'actions';
import types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {

   afterEach(() => {
      nock.cleanAll();
   });

   test('#it should generate requestEvents action', () => {
      let action = {
         type: types.EVENTS_FETCHING,
         payload: {
            isFetching: true
         }
      };

      let result = actions.requestEvents();

      expect(result).toEqual(action);
   });

   test('#it should generate eventsFetchingSuccess action', () => {
      let action = {
         type: types.GET_EVENTS_SUCCESS,
         payload: {
            events: [],
            isFetching: false,
            loaded: true
         }
      };

      let fakeResponse = {
         events: []
      };

      let result = actions.eventsFetchingSuccess(fakeResponse);

      expect(result).toEqual(action);
   });

   test('#it should generate eventsFetchingFail action', () => {
      let action = {
         type: types.GET_EVENTS_FAILURE,
         payload: {
            loaded: false,
            isFetching: false,
            message: 'Error handle'
         }
      };

      let result = actions.eventsFetchingFail('Error handle');

      expect(result).toEqual(action);
      expect(result.payload.message).toBeDefined();
   });

   test('#it should generate fetchEvents action', () => {
      const fakeEvents = [
         {
            eventCategory: 'Non-Profit Organization',
            eventDescription: 'Ladies, Wine & Design is a conversational series',
            eventEndTime: '2016-11-30T22:00:00+0200',
            eventId: '1836092243314871',
            eventName: 'eventName',
            eventPicture: 'eventPicture',
            eventStartTime: '2016-11-30T20:00:00+0200'
         }
      ];
      const expectedActions = [
         {
            type: types.EVENTS_FETCHING,
            payload: {
               isFetching: true
            }
         }, {
            type: types.GET_EVENTS_SUCCESS,
            payload: {
               events: fakeEvents,
               isFetching: false,
               loaded: true
            }
         }
      ];
      const store = mockStore({events: [], isFetching: false, loaded: false});

      nock('http://localhost:8000/v1.0/')
         .get('/events')
         .reply(200, {events: fakeEvents});

      return store
         .dispatch(actions.fetchEvents())
         .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
         });
   });
});
