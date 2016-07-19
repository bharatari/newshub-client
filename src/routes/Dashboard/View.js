import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table } from 'components/';
import reservation from 'modules/reservation/utils';
import _ from 'lodash';
import moment from 'moment';

const time = classNames(
  'ion-ios-time-outline',
  classes.icon
);

const date = classNames(
  'ion-ios-calendar-outline',
  classes.icon
);

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
    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Dashboard" user={this.props.user}>
          <div className="ui stackable grid">
            <div className="eight wide column">
              <p className={classes.time}><i className={time}></i>{moment().format("hh:mm A")}</p>
            </div>
            <div className="eight wide column">
              <p className={classes.date}><i className={date}></i>{moment().format("dddd, MMMM Do YYYY")}</p>
            </div>
            <div className="eight wide column">
              <h1 className={classes.header}>Upcoming Reservations</h1>
              {
                !_.isEmpty(this.props.upcomingReservations) ?
                <Table fields={this.state.fields}
                  data={this.props.upcomingReservations} 
                  actions={this.props.actions} 
                  route="/app/reservation" /> :
                <p className={classes.empty}>Nothing here...</p>
              }
              
            </div>
            <div className="eight wide column">
              <h1 className={classes.header}>Current Reservations</h1>
              {
                !_.isEmpty(this.props.currentReservations) ?
                <Table fields={this.state.fields}
                  data={this.props.currentReservations} 
                  actions={this.props.actions}
                  route="/app/reservation" /> :
                <p className={classes.empty}>Nothing here...</p>
              }
            </div>
          </div>
        </SidebarPage>
      </div>
    );
  }
}
