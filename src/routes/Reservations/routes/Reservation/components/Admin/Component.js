import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading } from 'components/';
import reservationUtils from 'modules/reservation/utils';

const buttonStyle = classNames(
  'ui button inverted blue button-light'
);
export default class Admin extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  handleClick = () => {
    const status = reservationUtils.computeReservationStatus(this.props.reservation);
    const body = reservationUtils.constructAdminAction(status);

    this.props.actions.updateReservation(this.props.reservation.id, body);
  };
  render() {
    const { reservation } = this.props;
    const button = () => {
      if (reservation) {
        const status = reservationUtils.computeReservationStatus(reservation);

        if (status === 'NEEDS_APPROVAL') {
          return <button className={buttonStyle} onClick={this.handleClick}>APPROVE</button>;
        } else if (status === 'APPROVED') {
          return <button className={buttonStyle} onClick={this.handleClick}>CHECK OUT</button>;
        } else if (status === 'CHECKED_OUT') {
          return <button className={buttonStyle} onClick={this.handleClick}>CHECK IN</button>;
        } else if (status === 'CHECKED_IN') {
          return <p className={classes.empty}>Nothing to see here...</p>;
        } else {
          return <p className={classes.empty}>Nothing to see here...</p>;;
        }
      } else {
        return null;
      }
    };

    return (
      <div>
        <p className={classes.header}>Actions</p>
        {button()}
      </div>
    );
  }
}
