import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Clock, Date, Card, Status } from 'components/';
import reservation from 'modules/reservation/utils';
import _ from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
      { label: 'Start Date', property: 'startDate' , type: 'date' },
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
    ],
  };
  render() {
    const { requestingCurrent, requestingUpcoming } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Dashboard" user={this.props.user} loading={requestingCurrent || requestingUpcoming}>
          <div className="ui stackable grid">
            <Card column="four" background="#46b7b3">
              <h1 className={classes.statText}>41</h1>
              <p className={classes.statLabel}>USERS</p>  
            </Card>
            <Card column="four" background="#ff6a6c">
              <h1 className={classes.statText}>126</h1>
              <p className={classes.statLabel}>DEVICES</p>  
            </Card>
            <Card column="four" background="#F2711C">
              <h1 className={classes.statText}>12</h1>
              <p className={classes.statLabel}>RESERVATIONS</p>  
            </Card>
            <Card column="four" background="#2185D0">
              <h1 className={classes.statText}>6</h1>
              <p className={classes.statLabel}>PROJECTS</p>  
            </Card>
            <Card>
              <p className={classes.date}><Date /></p>
            </Card>
            <Card>
              <p className={classes.time}><Clock /></p>
            </Card>
            <Card>
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
            </Card>
            <Card>
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
            </Card>
          </div>
        </SidebarPage>
      </div>
    );
  }
}
