/* eslint-disable import/no-deprecated */
/* eslint-disable import/imports-first */
/* eslint-disable global-require */

import Immutable from 'immutable';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './store/configureStore';

const initialState = new Immutable.Map();

const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS();
  },
});

injectTapEventPlugin();

import './assets/normalize.less';
import './assets/media.less';
import './assets/typography.less';

render(
  <AppContainer>
    <Root
      history={history}
      store={store}
    />
  </AppContainer>,
  document.getElementById('content')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;

    render(
      <AppContainer>
        <NextApp
          history={history}
          store={store}
        />
      </AppContainer>,
      document.getElementById('content')
    );
  });
}
