import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import authentication from 'modules/authentication/utils';

const renderField = ({ input, meta: { touched, error }}) => (
  <span>
    <input {...input} />
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </span>
);

class LoginForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    requestingLogin: PropTypes.bool.isRequired,
  };
  handleClick = () => {
    this.props.actions.push('/app/signup');
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, requestingLogin } = this.props;
    const button = classNames(
      'ui fluid large black submit button button-light',
      classes.button,
      { loading: requestingLogin }
    );
    const signup = classNames(
      'ui fluid large inverted blue submit button button-light',
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <Field name="username" type="text" placeholder="Username" component="input" />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <Field name="password" type="password" placeholder="Password" component="input" />
          </div>
        </div>
        <button type="submit" className={button}
          disabled={this.props.requestingLogin || this.props.response}>
          Login
        </button>
        <div className={signup} onClick={this.handleClick}>
          Signup
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  validate: authentication.validateLogin,
})(LoginForm);
