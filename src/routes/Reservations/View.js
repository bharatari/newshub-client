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
    this.goToFirstPage();
  }
  handleClick = () => {
    this.props.actions.push('/app/reservation/new');
  };
  goToPage = (page, event) => {
    this.props.actions.fetchReservations(null, null, (page - 1) * 10);
  };
  goToFirstPage = () => {
    this.props.actions.fetchReservations(null, null, 0);
  };
  goToLastPage = () => {
    this.props.actions.fetchReservations(null, null, (this.props.totalPages - 1) * 10);
  };
  render() {
    return (
      <Data data={this.props.reservations} loading={this.props.requestingReservations}
        header="Reservations" user={this.props.user} currentUrl={this.props.currentUrl}
        actions={this.props.actions} fields={this.state.fields} route="/app/reservation"
        currentPage={this.props.currentPage} totalPages={this.props.totalPages}
        goToPage={this.goToPage} goToFirstPage={this.goToFirstPage}
        goToLastPage={this.goToLastPage} />
    );
  }
}
