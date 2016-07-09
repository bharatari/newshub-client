module.exports = {
  validateSignup(values) {
    let errors = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  }
};
