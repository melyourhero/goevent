import { Component, PropTypes } from 'react';

import { Marker as GoogleMarker } from 'react-google-maps';

class Marker extends Component {
  static propTypes ={
    data: PropTypes.any,
    position: PropTypes.object,
    onClick: PropTypes.func,
  }

  render() {
    const {
        data,
        position,
        onClick,
        ...rest
    } = this.props;

    return (
      <GoogleMarker
        position={position}
        title={data}
        onClick={onClick}
        {...rest}
      />
    );
  }
}

export default Marker;
