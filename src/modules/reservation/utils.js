import _ from 'lodash';

module.exports = {
  validateNewReservation(values) {
    let errors = {};

    if (!values.startDate) {
      errors.startDate = 'Required';
    }

    if (!values.endDate) {
      errors.endDate = 'Required';
    }

    if (!values.purpose) {
      errors.purpose = 'Required';
    }

    if (!values.devices || _.isEmpty(values.devices)) {
      errors.devices = 'Need to add at least one device to reservation';
    }

    return errors;
  },
  computeReservationStatus(reservation) {
    if (!reservation.approved) {
      return 'NEEDS_APPROVAL';
    } else if (reservation.approved && !reservation.checkedOut && !reservation.checkedIn) {
      return 'APPROVED';
    } else if (reservation.approved && reservation.checkedOut && !reservation.checkedIn) {
      return 'CHECKED_OUT';
    } else if (reservation.approved && reservation.checkedOut && reservation.checkedIn) {
      return 'CHECKED_IN';
    } else {
      return 'UNKNOWN';
    }
  },
  getReservationStatus(reservation) {
    return this.reservationStatus[this.computeReservationStatus(reservation)];
  },
  reservationStatus: {
    'NEEDS_APPROVAL': 'Needs Approval',
    'APPROVED': 'Approved',
    'CHECKED_OUT': 'Checked Out',
    'CHECKED_IN': 'Checked In',
    'UNKNOWN': 'Unknown',
  },
  constructAdminAction(status) {
    if (status === 'NEEDS_APPROVAL') {
      return {
        approved: true,
      };
    } else if (status === 'APPROVED') {
      return {
        checkedOut: true,
      };
    } else if (status === 'CHECKED_OUT') {
      return {
        checkedIn: true,
      };
    }

    return null;
  }
};
