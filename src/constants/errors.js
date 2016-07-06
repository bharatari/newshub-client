export const errorMessages = {
  EMAIL_TAKEN: 'That email is taken.',
  USERNAME_TAKEN: 'That username is taken.',
  SIGNUP_FAILED: 'We were not able to create an account for you, please try again later',
  ERROR: 'Something went wrong.'
};

export function getErrorMessage(errorCode) {
  return this.errorMessages[errorCode] || this.errorMessages['ERROR'];
};

export const successMessages = {
  SIGNUP: { title: 'Email Verification', body: 'We have sent a verification email to your email address. You will need to verify your email address before using your account.' }
};

export function getSuccessMessage(successCode) {
  return successMessages[successCode];
};
