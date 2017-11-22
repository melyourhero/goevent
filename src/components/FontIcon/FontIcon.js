import { PureComponent, PropTypes } from 'react';
import Radium from 'radium';

import { FontIconStyle } from './Styles';

@Radium
class FontIcon extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    fontSize: PropTypes.number,
    hoverColor: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
    onTouchTap: PropTypes.func,
  }

  static defaultProps = {
    className: '',
    color: '',
  }

  render() {
    return (
      <FontIconStyle
        color={this.props.color}
        fontSize={this.props.fontSize}
        hoverColor={this.props.hoverColor}
        style={this.props.style}
        onTouchTap={this.props.onTouchTap}
      >
        {this.props.type}
      </FontIconStyle>
    );
  }
}

export default FontIcon;
