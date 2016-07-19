export default {
  errors: {
    'EMAIL_TAKEN': { 
      header: 'That email is taken.',
      text: 'Try a different one to continue',
    },
    'USERNAME_TAKEN': {
      header: 'That username is taken.',
      text: 'Try a different one to continue'
    },
    'ERROR': {
      header: 'Something went wrong. Try again.',
    },
    'SIGNUP_TOKEN_EXPIRED': {
      header: 'That signup token is expired',
      text: 'You will need to request a new one from management',
    },
    'SIGNUP_TOKEN_INVALID': {
      header: 'Your signup token is invalid',
      text: 'You will need to request a new one from management',
    },
    'SIGNUP_TOKEN_USED': {
      header: 'This signup token has already been used',
      text: 'You will need to request a new one from management',
    },
    'USER_DISABLED': {
      header: 'Your account has been disabled',
      text: 'Please contact management if you believe this has happened in error'
    },
  },
  getError(code) {
    return this.errors[code] || this.errors['ERROR'];
  }
}
