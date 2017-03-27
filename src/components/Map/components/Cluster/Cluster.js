import { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';

import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

class Cluster extends PureComponent {
  static propTypes = {
    averageCenter: PropTypes.bool,
    children: PropTypes.node,
    enableRetinaIcons: PropTypes.bool,
    gridSize: PropTypes.number,
    onClusterClick: PropTypes.func,
  }

  defaultProps = {
    averageCenter: true,
    enableRetinaIcons: true,
  }

  setClusterNode = (node) => {
    this.clusterNode = node;
  }

  handleOnClick = (cluster) => {
    const { onClusterClick } = this.props;

    const clusterData = cluster.getMarkers().map((marker) => JSON.parse(marker.title));

    console.log('Cluster', clusterData);

    if (onClusterClick) {
      onClusterClick(Immutable.fromJS(clusterData));
    }
  }

  render() {
    const {
        averageCenter,
        enableRetinaIcons,
        gridSize,
        children,
        ...rest
    } = this.props;

    return (
      <MarkerClusterer
        averageCenter={averageCenter}
        enableRetinaIcons={enableRetinaIcons}
        gridSize={gridSize}
        ref={this.setClusterNode}
        onClick={this.handleOnClick}
        {...rest}
      >
        {children}
      </MarkerClusterer>
    );
  }
}

export default Cluster;
