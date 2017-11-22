import { PropTypes } from 'react';

// import { SpinnerDivStyle } from './Styles';

import CircularProgress from 'material-ui/CircularProgress';

const Spinner = (props) => (
  <div>
    <CircularProgress
      size={80}
      style={{
        display: props.isFetching ? 'block' : 'none',
        margin: '10% auto',
      }}
      thickness={5}
    />
  </div>
);

Spinner.propTypes = {
  isFetching: PropTypes.bool,
};

export default Spinner;
