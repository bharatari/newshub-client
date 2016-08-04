import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Clock, Date } from 'components/';
import reservation from 'modules/reservation/utils';
import _ from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const time = classNames(
  'ion-ios-time-outline',
  classes.icon
);

const date = classNames(
  'ion-ios-calendar-outline',
  classes.icon
);

const timeContainer = classNames(
  'eight wide column',
  classes.card,
  classes.timeContainer
);

const dateContainer = classNames(
  'eight wide column',
  classes.card,
  classes.dateContainer
);

const grid = classNames(
  'ui stackable grid',
  classes.gridPadding
)

export default class HomeView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.fetchCurrentReservations();
    this.props.actions.fetchUpcomingReservations();
  }
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', custom: reservation.getReservationStatus.bind(reservation) },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  render() {
    const { requestingCurrent, requestingUpcoming } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions} noPadding={true}
          header="Dashboard" user={this.props.user} loading={requestingCurrent || requestingUpcoming}>
          <div className={grid}>
            <div className={dateContainer}>
              <p className={classes.date}><Date /></p>
            </div>
            <div className={timeContainer}>
              <p className={classes.time}><Clock /></p>
            </div>
          </div>
          <div className={classes.padding}>
            <div className="ui stackable grid">
              <div className="eight wide column">
                <h1 className={classes.header}>Upcoming Reservations</h1>
                <ReactCSSTransitionGroup
                  transitionName="page"
                  transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                  {
                    !_.isEmpty(this.props.upcomingReservations) ?
                    <Table key="content" fields={this.state.fields}
                      data={this.props.upcomingReservations} 
                      actions={this.props.actions} 
                      route="/app/reservation" /> :
                    <p key="empty" className={classes.empty}>Nothing here...</p>
                  }
                </ReactCSSTransitionGroup>              
              </div>
              <div className="eight wide column">
                <h1 className={classes.header}>Current Reservations</h1>
                <ReactCSSTransitionGroup
                  transitionName="page"
                  transitionAppear={true} transitionAppearTimeout={100} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                  {
                    !_.isEmpty(this.props.currentReservations) ?
                    <Table key="content" fields={this.state.fields}
                      data={this.props.currentReservations} 
                      actions={this.props.actions}
                      route="/app/reservation" /> :
                    <p key="empty" className={classes.empty}>Nothing here...</p>
                  }
                </ReactCSSTransitionGroup>
              </div>
            </div>
          </div>
        </SidebarPage>
      </div>
    );
  }
}
