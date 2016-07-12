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

    if (!values.notes) {
      errors.notes = 'Required';
    }

    if (!values.devices) {
      errors.devices = 'Required';
    }

    return errors;
  }
};
