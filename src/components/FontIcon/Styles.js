import { PureComponent, PropTypes } from 'react';
import Radium from 'radium';

const inlineStyles = {
  fontIcon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
};

@Radium
export class FontIconStyle extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    hoverColor: PropTypes.string,
    style: PropTypes.object,
    onTouchTap: PropTypes.func,
  }

  render() {
    return (
      <div
        style={[inlineStyles.fontIcon, this.props.style]}
        onTouchTap={this.props.onTouchTap}
      >
        <i
          className={`material-icons ${this.props.children}`}
          style={{
            color: this.props.color,
            fontSize: this.props.fontSize,
            ':hover': {
              color: this.props.hoverColor || this.props.color,
            },
          }}
        >
          {this.props.children}
        </i>
      </div>
    );
  }
}
