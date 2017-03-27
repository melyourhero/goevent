import { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as actions from '../../../actions/events';
import {
    getFilteredEventsByLocation,
    getEventsFetching,
    getEventsStatusLoading,
    getEventsLoadingError,
} from '../../../selectors/events';

import { GOOGLE_API_URL, KYIV_COORDINATES } from '../../../constants/Api';
import { ZERO, ONE, SIXTEEN, SIXTY, EMPTY_VALUE } from '../../../constants/Constants';
import { EMPTY_MAP, EMPTY_LIST } from '../../../constants/ImmutableCollections';

import Header from './components/Header';
import Map from '../../../components/Map';
import Spinner from '../../../components/Spinner';

import { DivStyle, mapElement, containerElement } from './Styles';

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    color: '#424242',
  },
});

const MAP_DEFAULT_ZOOM = SIXTEEN;
const MAP_DEFAULT_GRID_SIZE = SIXTY;

const EMPTY_BLOCK = (
  <div />
);

const isImmutableMap = (data) => Immutable.Map.isMap(data);

export class EventsMapPage extends PureComponent {
  static propTypes = {
    events: PropTypes.instanceOf(Immutable.List).isRequired,
    eventsLoaded: PropTypes.bool.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  state = {
    isNavigationDrawerOpen: false,
    isEventDetailDrawerOpen: false,
    currentLocation: KYIV_COORDINATES,
    event: EMPTY_MAP,
    indexOfCurrentEvent: EMPTY_VALUE,
  }

  componentDidMount = () => {
    const { fetchEvents, eventsLoaded } = this.props;

    if (eventsLoaded) {
      return EMPTY_VALUE;
    }

    return fetchEvents();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { event, indexOfCurrentEvent } = this.state;

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }

    if (isImmutableMap(event) && (prevState.indexOfCurrentEvent !== indexOfCurrentEvent) && event.get('eventLocation')) {
      const eventLocation = event.get('eventLocation');
      const coords = {
        lat: eventLocation.getIn(['location', 'latitude']),
        lng: eventLocation.getIn(['location', 'longitude']),
      };

      this.recenterMap(coords);
    }
  }

  setMap = (map) => {
    this.mapComponent = map;

    if (map && navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;

        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    }
  }

  isResponseEmpty = (response) => {
    if (response.size) {
      return response;
    }

    return EMPTY_LIST;
  }

  recenterMap = (center) => {
    const { currentLocation } = this.state;

    if (center) {
      this.mapComponent.panTo(center);
    } else {
      this.mapComponent.panTo(currentLocation);
    }
  }

  toggleNavigationDrawer = () => {
    this.setState((state) => ({
      isNavigationDrawerOpen: !state.isNavigationDrawerOpen,
      isEventDetailDrawerOpen: state.isEventDetailDrawerOpen
          ? !state.isEventDetailDrawerOpen : state.isEventDetailDrawerOpen,
    }));
  }

  openDetailDrawer = (event, index) => {
    this.setState(() => ({
      isEventDetailDrawerOpen: true,
      event,
      indexOfCurrentEvent: index,
    }));
  }

  closeDetailDrawer = () => {
    this.setState((state) => ({
      isEventDetailDrawerOpen: false,
      event: isImmutableMap(state.event) ? EMPTY_MAP : EMPTY_LIST,
    }));
  }

  recenterToNextEvent = () => {
    this.setState((state) => {
      const { events } = this.props;
      const eventsLength = events.size - ONE;
      const indexOfCurrentEvent = state.indexOfCurrentEvent !== eventsLength ? state.indexOfCurrentEvent + ONE : ZERO;
      const event = events.get(indexOfCurrentEvent);

      return ({
        indexOfCurrentEvent,
        event,
      });
    });
  }

  recenterToPreviousEvent = () => {
    this.setState((state) => {
      const { events } = this.props;
      const eventsLength = events.size - ONE;
      const indexOfCurrentEvent = state.indexOfCurrentEvent === ZERO ? eventsLength : state.indexOfCurrentEvent - ONE;
      const event = events.get(indexOfCurrentEvent);

      return ({
        indexOfCurrentEvent,
        event,
      });
    });
  }

  handleClusterClick = (data) => {
    this.setState((state) => ({
      event: data,
      isEventDetailDrawerOpen: !state.isEventDetailDrawerOpen,
    }));
  }


  renderSpinner = () => {
    const { isFetching } = this.props;

    return (
      <Spinner isFetching={isFetching} />
    );
  }

  renderMapContainer = () => {
    const { isFetching } = this.props;
    const mapContainerStyle = {
      visibility: isFetching ? 'hidden' : 'visible',
    };
    const mapContainer = (
      <containerElement style={mapContainerStyle} />
    );

    return mapContainer;
  }

  render() {
    const { events } = this.props;
    const {
        currentLocation,
        event,
        isNavigationDrawerOpen,
        isEventDetailDrawerOpen,
    } = this.state;

    return (
      <ThemeProvider muiTheme={muiTheme}>
        <DivStyle>
          <Header
            event={event}
            handleEventDetailDrawerClose={this.closeDetailDrawer}
            handleNavigationDrawerOpen={this.toggleNavigationDrawer}
            handleNextEvent={this.recenterToNextEvent}
            handlePreviousEvent={this.recenterToPreviousEvent}
            isEventDetailDrawerOpen={isEventDetailDrawerOpen}
            isNavigationDrawerOpen={isNavigationDrawerOpen}
            openDetailDrawer={this.openDetailDrawer}
          />
          {this.renderSpinner()}
          <Map
            center={currentLocation}
            containerElement={this.renderMapContainer()}
            defaultZoom={MAP_DEFAULT_ZOOM}
            googleMapURL={GOOGLE_API_URL}
            gridSize={MAP_DEFAULT_GRID_SIZE}
            loadingElement={EMPTY_BLOCK}
            mapElement={mapElement}
            markers={this.isResponseEmpty(events)}
            openDetailDrawer={this.openDetailDrawer}
            setMap={this.setMap}
            onClusterClick={this.handleClusterClick}
          />
        </DivStyle>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  events: getFilteredEventsByLocation(state),
  isFetching: getEventsFetching(state),
  eventsLoaded: getEventsStatusLoading(state),
  errorMessage: getEventsLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: bindActionCreators(actions.fetchEvents, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsMapPage);
