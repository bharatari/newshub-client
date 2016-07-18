import jwt_decode from 'jwt-decode';

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

    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
    }

    if (!values.signupToken) {
      errors.signupToken = 'Required';
    }

    return errors;
  },
  isAdmin(user) {
    if (user) {
      if (user.roles) {
        if (_.isString(user.roles)) {
          return user.roles.includes('admin');
        }
      }
    }
    
    return false;
  },
  getId(jwt) {
    return new Promise((resolve, reject) => {
      try {
        const decoded = jwt_decode(jwt);

        resolve(decoded.id)
      } catch (e) {
        reject();
      }
    });    
  }
};
