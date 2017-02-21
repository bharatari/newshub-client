import _ from 'lodash';

export default {
  processResponse(data) {
    if (data) {
      return {
        data,
        total: data.length,
      }
    } else {
      return {
        data,
        total: null,
      }
    }
  },
  validateNewDevice(values) {
    let errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.label) {
      errors.label = 'Required';
    }

    if (!values.quantity) {
      errors.quantity = 'Required. This is typically set to 1.';
    }

    if (!values.type) {
      errors.type = 'Required';
    }

    return errors;
  },
};
