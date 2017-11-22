import { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import Immutable from 'immutable';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

import { DETAIL_DRAWER_DEFAULT_WIDTH, NAVIGATION_DRAWER_DEFAULT_WIDTH } from '../../../../../constants/Constants';

import { ContentStyle, BodyStyle } from './Styles';

class Header extends PureComponent {
  static propTypes = {
    bodyDrawerDetailClassName: PropTypes.string,
    bodyDrawerDetailStyle: PropTypes.object,
    contentDrawerDetailClassName: PropTypes.string,
    contentDrawerDetailStyle: PropTypes.object,
    event: PropTypes.oneOfType([
      PropTypes.instanceOf(Immutable.Map),
      PropTypes.instanceOf(Immutable.List),
    ]),
    handleEventDetailDrawerClose: PropTypes.func,
    handleNavigationDrawerOpen: PropTypes.func,
    handleNextEvent: PropTypes.func,
    handlePreviousEvent: PropTypes.func,
    isEventDetailDrawerOpen: PropTypes.bool,
    isNavigationDrawerOpen: PropTypes.bool,
    openDetailDrawer: PropTypes.func,
  }

  handleClusterClickTest = (data) => () => {
    this.props.openDetailDrawer(data);
  }

  renderClusterData = () => (
    <div>
      <h6
        style={{
          color: 'grey',
          fontSize: 16,
          margin: 15,
        }}
      >
        {'Events'}
      </h6>
      <hr />
      {
                this.props.event.toArray().map((data, key) => (
                  <div key={key}>
                    <FlatButton
                      icon={(<ArrowForward style={{ position: 'absolute', right: 10, top: 5 }} />)}
                      label={data.get('eventName')}
                      labelPosition="before"
                      style={{ marginTop: 15, textAlign: 'left', width: '100%' }}
                      onTouchTap={this.handleClusterClickTest(data)}
                    />
                  </div>
            ))
            }
    </div>
    )


  renderMarkerData = () => {
    const {
            bodyDrawerDetailClassName,
            bodyDrawerDetailStyle,
            contentDrawerDetailClassName, // eslint-disable-line
            contentDrawerDetailStyle, // eslint-disable-line
            event,
            handleEventDetailDrawerClose,
            handleNextEvent,
            handlePreviousEvent,
            isEventDetailDrawerOpen, // eslint-disable-line
        } = this.props;

    return (
      <div>
        <BodyStyle
          className={bodyDrawerDetailClassName}
          closeDrawer={handleEventDetailDrawerClose}
          event={event}
          style={bodyDrawerDetailStyle}
        />
        <RaisedButton
          fullWidth
          label={'Next event'}
          style={{ marginTop: 5 }}
          onTouchTap={handleNextEvent}
        />
        <RaisedButton
          fullWidth
          label={'Previous event'}
          style={{ marginTop: 5 }}
          onTouchTap={handlePreviousEvent}
        />
      </div>
    );
  }

  renderEventDetailDrawer = () => {
    const {
      bodyDrawerDetailClassName, // eslint-disable-line
      bodyDrawerDetailStyle, // eslint-disable-line
      contentDrawerDetailClassName,
      contentDrawerDetailStyle,
      event, // eslint-disable-line
      handleEventDetailDrawerClose,// eslint-disable-line
      handleNextEvent, // eslint-disable-line
      handlePreviousEvent, // eslint-disable-line
      isEventDetailDrawerOpen,
    } = this.props;

    return (
      <Drawer
        open={isEventDetailDrawerOpen}
        openSecondary
        width={DETAIL_DRAWER_DEFAULT_WIDTH}
      >
        <ContentStyle
          className={contentDrawerDetailClassName}
          style={{ marginBottom: 30, ...contentDrawerDetailStyle }}
        >
          {Immutable.Map.isMap(this.props.event) ? this.renderMarkerData() : this.renderClusterData()}
        </ContentStyle>
      </Drawer>
    );
  }

  render() {
    const { handleNavigationDrawerOpen, isNavigationDrawerOpen } = this.props;

    console.log(this.props);

    return (
      <AppBar onLeftIconButtonTouchTap={handleNavigationDrawerOpen}>
        <Drawer
          docked={false}
          open={isNavigationDrawerOpen}
          width={NAVIGATION_DRAWER_DEFAULT_WIDTH}
          onRequestChange={handleNavigationDrawerOpen}
        >
          <MenuItem>
            <Link to="/component2">{'To component2'}</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/events-list">{'List of events'}</Link>
          </MenuItem>
          <MenuItem>{'Saved'}</MenuItem>
          <MenuItem>{'Events map'}</MenuItem>
          <MenuItem>{'Login'}</MenuItem>
        </Drawer>
        {this.renderEventDetailDrawer()}
      </AppBar>
    );
  }
 }

export default Header;
