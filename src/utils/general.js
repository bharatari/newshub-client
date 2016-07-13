import _ from 'lodash';

export default {
  insert(array, insert, at) {
    array.splice(at, 0, insert);
  },
  toArray(csv) {
    if (csv) {
      let array = csv.split(',');
      
      for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
      }
      
      return array;
    }
    
    return [];
  },
  toCSV(array) {
    let csv = array[0];
    
    for (let i = 1; i < array.length; i++) {
      csv += ', ' + array[i];
    }
    
    return csv;
  },
  toObjectCSV(array) {
    let csv = array[0].name;
    
    for (let i = 1; i < array.length; i++) {
      csv += ', ' + array[i].name;
    }
    
    return csv;
  },
  trimAndLowercase(array) {
    for (let i = 0; i < array.length; i++) {
      if (_.isString(array[i])) {
        array[i].trim();
        array[i] = array[i].toLowerCase();        
      }
    }
    
    return array;
  },
  cleanEmptyStrings(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "") {
        array.splice(i, 1);
      }
    }
    
    return array;
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
  }
}
