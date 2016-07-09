import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table } from 'components/';

export default class ReservationsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
    authenticated: PropTypes.bool,
  };
  state = {
    fields: [
      { label: 'Equipment', property: 'devices.label' },
      { label: 'Name', property: 'user.fullName'},
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status' },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    this.props.actions.fetchReservations();
  }
  render() {
    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Reservations">
          { this.props.reservations ?
            <Table fields={this.state.fields}
              data={this.props.reservations} 
              actions={this.props.actions}
              route="/app/reservation" />
            : null
          }
        </SidebarPage>
      </div>
    );
  }
}
