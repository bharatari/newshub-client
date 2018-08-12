import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Status, Data } from 'components/';
import reservation from 'modules/reservation/utils';

export default class ReservationsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Start Date', property: 'startDate' , type: 'date' },
      { label: 'Approved By', property: 'approvedBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
      { label: 'Created At', property: 'createdAt', type: 'date' },
    ],
    reload: false,
  };
  render() {
    return (
      <Data data={this.props.roomReservations} loading={this.props.requestingRoomReservations}
        header="Room Reservations" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/room-reservation"
        page={this.props.page} totalPages={this.props.totalPages}
        goToPage={this.goToPage} sortField={this.props.sortField} sortType={this.props.sortType}
        sortBy={this.sortBy} newURL="/app/room-reservation/new" location={this.props.location} 
        fetch={this.props.actions.fetchRoomReservations} roles={this.props.roles} />
    );
  }
}
