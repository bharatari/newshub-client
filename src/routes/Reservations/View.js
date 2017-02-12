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
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
    ],
  };
  componentDidMount() {
    this.goToPage(1);
  }
  goToPage = (page, event) => {
    this.props.actions.fetchReservations({
      page,
    });
  };
  sortBy = (field, type) => {
    this.props.actions.fetchReservations({
      sortField: field,
      sortType: type,
    });
  };
  render() {
    return (
      <Data data={this.props.reservations} loading={this.props.requestingReservations}
        header="Reservations" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/reservation"
        currentPage={this.props.currentPage} totalPages={this.props.totalPages}
        goToPage={this.goToPage} sortField={this.props.sortField} sortType={this.props.sortType}
        sortBy={this.sortBy} newURL="/app/reservation/new" />
    );
  }
}
