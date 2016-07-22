import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading } from 'components/';
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
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', custom: reservation.getReservationStatus.bind(reservation) },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    this.props.actions.fetchReservations();
  }
  handleClick = () => {
    this.props.actions.push('/app/reservation/new');
  };
  render() {
    const right = <button className="ui animated button inverted button-light" onClick={this.handleClick}>
                    <div className="visible content">ADD</div>
                    <div className="hidden content">
                      <i className="add circle icon"></i>
                    </div>
                  </button>;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Reservations" right={right} loading={this.props.requestingReservations}
          user={this.props.user}>
          { this.props.reservations ?
            <Table fields={this.state.fields}
              data={this.props.reservations} 
              actions={this.props.actions}
              route="/app/reservation" />
            : <TextLoading loading={this.props.requestingReservations} />
          }
        </SidebarPage>
      </div>
    );
  }
}
