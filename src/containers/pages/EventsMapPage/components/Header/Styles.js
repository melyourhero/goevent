import { PropTypes, Component } from 'react';
import Radium from 'radium';
import Immutable from 'immutable';

import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';

import FontIcon from '../../../../../components/FontIcon';

import { ZERO, DESCRIPTION_DEFAULT_LENGTH } from '../../../../../constants/Constants';

const theme = {
  colors: {
    ACCENT_COLOR: '#2196F3',
    FAB: '#F5F5F5',
    FAB_ICON: '#757575',
  },
  defaultStyles: {
    bodyStyles: {
      iconCloseColor: '#fff',
      iconCloseFontSize: 30,
      iconClose: {
        display: 'inline-block',
        position: 'absolute',
        color: '#F5F5F5',
        right: 5,
        zIndex: 999,
      },
      floatingActionButton: {
        position: 'absolute',
        top: -30,
        right: 30,
      },
    },
  },
};

@Radium
export class ContentStyle extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  render() {
    const { children, className, style } = this.props;
    const contentStyle = Object.assign({}, { flex: 1 }, style);

    return (
      <div
        className={className}
        style={contentStyle}
      >
        {children}
      </div>
    );
  }
}

@Radium
export class BodyStyle extends Component {
  static propTypes = {
    className: PropTypes.string,
    closeDrawer: PropTypes.func,
    event: PropTypes.instanceOf(Immutable.Map),
    style: PropTypes.object,
  }

  state = {
    isDescriptionExpanded: false,
  }

  getCityCountry = (event) => (event.getIn(['eventLocation', 'location', 'country'])
      ? `${event.getIn(['eventLocation', 'location', 'city'])}, ${event.getIn(['eventLocation', 'location', 'country'])}`
      : 'Unknown city and country')

  getStreet = (event) => (event.getIn(['eventLocation', 'location', 'street'])
      ? event.getIn(['eventLocation', 'location', 'street']) : 'Unknown street')

  handleExpandDescription = () => {
    this.setState((state) => ({
      isDescriptionExpanded: !state.isDescriptionExpanded,
    }));
  }

  checkExpandedDescription = () => {
    const { isDescriptionExpanded } = this.state;
    const { event } = this.props;
    const description = event.get('eventDescription');

    return (description && description.length > DESCRIPTION_DEFAULT_LENGTH) && !isDescriptionExpanded;
  }

  shortDescription = () => this.props.event.get('eventDescription').slice(ZERO, DESCRIPTION_DEFAULT_LENGTH).concat('...')

  longDescription = () => this.props.event.get('eventDescription')

  renderDescription = () => {
    if (!this.props.event.get('eventDescription')) {
      return (
        <span>{'Description not attached'}</span>
      );
    }

    return (
      <div>
        <span>
          {this.checkExpandedDescription() ? this.shortDescription() : this.longDescription()}
          <span
            style={{
              paddingLeft: 5,
              color: '#1565C0',
              cursor: 'pointer',
            }}
            onClick={this.handleExpandDescription}
          >
            {this.state.isDescriptionExpanded ? 'Read less' : 'Read more'}
          </span>
        </span>
      </div>
    );
  }

  render() {
    const { className, style } = this.props;
    const { event, closeDrawer } = this.props;
    const cityCountry = this.getCityCountry(event);
    const street = this.getStreet(event);
    const eventName = event.get('eventName');
    const eventCategory = event.get('eventCategory') || 'None';

    return (
      <div
        className={className}
        style={style}
      >
        <Card>
          <FontIcon
            color={theme.defaultStyles.bodyStyles.iconCloseClose}
            fontSize={theme.defaultStyles.bodyStyles.iconCloseFontSize}
            style={{ ...theme.defaultStyles.bodyStyles.iconClose }}
            type="close"
            onTouchTap={closeDrawer}
          />
          <CardMedia
            overlay={(
              <CardTitle
                style={{
                  backgroundColor: theme.colors.ACCENT_COLOR,
                }}
                subtitle={cityCountry}
                title={street}
              >
                <FloatingActionButton
                  backgroundColor={theme.colors.FAB}
                  style={{ ...theme.defaultStyles.bodyStyles.floatingActionButton }}
                >
                  <FontIcon
                    color={theme.colors.FAB_ICON}
                    fontSize={25}
                    style={{ paddingLeft: 15 }}
                    type={'grade'}
                  />
                </FloatingActionButton>
              </CardTitle>
          )}
            overlayContentStyle={{ padding: 0 }}
          >
            <img
              alt="Not found"
              src={event.get('eventPicture')}
              style={{ minHeight: 200 }}
            />
          </CardMedia>
          <CardTitle
            subtitle={eventCategory}
            title={eventName}
          />
          <CardText>
            {this.renderDescription()}
            <Paper
              style={{ padding: 10, margin: '10px 0px' }}
              zDepth={2}
            >
              {`Event category: ${eventCategory}`}
            </Paper>
            <Paper
              style={{ padding: 10, margin: '10px 0px' }}
              zDepth={2}
            >
              {`Event start time: ${event.get('eventEndTime')}`}
            </Paper>
            <Paper
              style={{ padding: 10, margin: '10px 0px' }}
              zDepth={2}
            >
              {`Event end time: ${event.get('eventEndTime')}`}
            </Paper>
          </CardText>
        </Card>
      </div>
    );
  }
}
