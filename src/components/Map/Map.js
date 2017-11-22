import { withGoogleMap, GoogleMap } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';

import Cluster from './components/Cluster';
import Marker from './components/Marker';

import { EMPTY_VALUE } from '../../constants/Constants';

const Map = withScriptjs(withGoogleMap((props) => {
  const handleMarkerClick = (event, index) => () => {
    props.openDetailDrawer(event, index);
  };

  const handleClusterClick = (data) => {
    props.openDetailDrawer(data);
  };

  const checkEventLocationPropertyExist = (event) => event.get('eventLocation') &&
    event.get('eventLocation').get('location');

  const loadMarkersOnMap = (events) => {
    if (!events.size) {
      return EMPTY_VALUE;
    }

    return events.map((event, index) => {
      if (!checkEventLocationPropertyExist(event)) {
        return EMPTY_VALUE;
      }

      const marker = {
        position: {
          lat: event.get('eventLocation').get('location').get('latitude'),
          lng: event.get('eventLocation').get('location').get('longitude'),
        },
        data: JSON.stringify(event),
      };

      return (
        <Marker
          data={marker.data}
          key={event.get('eventId')}
          position={marker.position}
          onClick={handleMarkerClick(event, index)}
        />
      );
    });
  };

  return (
    <GoogleMap
      defaultCenter={props.center}
      defaultZoom={props.defaultZoom}
      ref={props.setMap}
    >
      <Cluster
        averageCenter
        enableRetinaIcons
        gridSize={props.gridSize}
        onClusterClick={handleClusterClick}
      >
        {loadMarkersOnMap(props.markers)}
      </Cluster>
    </GoogleMap>
  );
}));

export default Map;
