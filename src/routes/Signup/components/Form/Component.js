import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import user from 'modules/user/utils';

const renderField = ({ input, type, placeholder, meta: { touched, error }}) => (
  <span>
    <input {...input} type={type} placeholder={placeholder} />
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </span>
);

class SignupForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    requestingCreateUser: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, requestingCreateUser, error } = this.props;
    const button = classNames(
      'ui fluid large blue submit button button-light',
      classes.button,
      { loading: requestingCreateUser }
    );
    const form = classNames(
      'ui form',
      classes.form
    )

    return (
      <form onSubmit={handleSubmit} className={form}>
      <div className="ui grid">
          <div className="six wide column">
            <h3>First Name</h3>
          </div>
          <div className="ten wide column">
            <Field name="firstName" component={renderField} type="text" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Last Name</h3>
          </div>
          <div className="ten wide column">
            <Field name="lastName" component={renderField} type="text" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Username</h3>
            <p>Something short and simple for people to easily tag and refer to you.</p>
          </div>
          <div className="ten wide column">
            <Field name="username" component={renderField} type="text" placeholder="eg. jdoe, johndoe" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Password</h3>
            <p>
              Your password must be at least 6 characters long, and not more than 18 characters long.
            </p>
          </div>
          <div className="ten wide column">
            <Field name="password" component={renderField} type="password" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Confirm Password</h3>
            <p>
              One more time.
            </p>
          </div>
          <div className="ten wide column">
            <Field name="confirmPassword" component={renderField} type="password" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Email</h3>
            <p>Personal email addresses are preferred, but you can use your school address if that's what you check most.</p>
          </div>
          <div className="ten wide column">
            <Field name="email" component={renderField} type="email" />
          </div>
        </div>
        <div className="ui grid">
          <div className="six wide column">
            <h3>Signup Token</h3>
            <p>This one-time-use token should be provided to you by management to give you permission to create an account.</p>
          </div>
          <div className="ten wide column">
            <Field name="signupToken" component={renderField} type="text" />
          </div>
        </div>
        <button type="submit" className={button}
          disabled={this.props.requestingCreateUser || this.props.user}>
          Signup
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup',
  validate: user.validateSignup,
})(SignupForm);
