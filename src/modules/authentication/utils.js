module.exports = {
  validateLogin(values) {
    let errors = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  }
};
