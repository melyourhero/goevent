import { PropTypes, PureComponent } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import DevTools from './DevTools';
import routes from '../routes';

const ReduxTools = window.devToolsExtension ? () => null : DevTools;

class Root extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <div className="goevent-root-wrapper">
          <Router
            history={history}
            routes={routes}
          />
          <ReduxTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
