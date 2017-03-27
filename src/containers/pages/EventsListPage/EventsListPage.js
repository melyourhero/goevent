import { PropTypes, PureComponent } from 'react';

class EventsListPage extends PureComponent {
  static propTypes = {
    chilred: PropTypes.node,
  }

  render() {
    return (
      <div>
        <h1>{'Events list'}</h1>
      </div>
    );
  }
}

export default EventsListPage;
