import { PropTypes } from 'react';

const inlineStyles = {
  mapElementStyle: {
    height: '93vh',
    width: '100%',
  },
};

export const mapElement = (
  <div
    className="mapElement"
    style={inlineStyles.mapElementStyle}
  />
);

export const containerElement = (props) => (
  <div
    className={props.className || 'containerElement'}
    style={props.style}
  />
);

containerElement.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};


export const DivStyle = (props) => (
  <div>
    {props.children}
  </div>
);

const defaultPropTypes = {
  children: PropTypes.node,
};

DivStyle.propTypes = defaultPropTypes;
