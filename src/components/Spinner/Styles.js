import { PropTypes, PureComponent } from 'react';
import Radium from 'radium';

const inlineStyles = {
  wrap: {
    width: '100%',
    height: 470,
    display: 'flex',
    alignItems: 'center',
  },
  spinner: {
    width: 100,
    height: 100,
    background: '#eee',
    borderRadius: '50%',
    position: 'relative',
    margin: '0 auto',
  },
};

@Radium
export class SpinnerDivStyle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isFetching: PropTypes.bool,
  }
  static defaultProps = {
    className: '',
  }
  spinnerLoadStyles = (isFetching) => {
    if (isFetching) {
      return {
        display: '',
      };
    }

    return {
      display: 'none',
    };
  };
  render() {
    const { isFetching, className } = this.props;

    const styles = Object.assign({}, { ...inlineStyles.wrap }, this.spinnerLoadStyles(isFetching));

    return (
      <div
        className={className}
        style={styles}
      >
        <p>{'Loading...'}</p>
      </div>
    );
  }
}
