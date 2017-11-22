import { Route } from 'react-router';

import App from './containers/App';
import EventsListPage from './containers/pages/EventsListPage';
import EventsMapPage from './containers/pages/EventsMapPage';
import Container from './components/Component';

export default (
  <Route
    component={App}
    path="/"
  >
    <Route
      component={EventsListPage}
      path="events-list"
    />
    <Route
      component={EventsMapPage}
      path="events-map"
    />
    <Route
      component={Container}
      path="component2"
    />
  </Route>
);
