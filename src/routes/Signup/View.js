import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Form } from './components';

export default class LoginView extends React.Component {
  static propTypes = {
    requestingCreateUser: PropTypes.bool,
    error: PropTypes.any,
    user: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.createUser({
      username: values.username,
      password: values.password,
      email: values.email,
    });
  };
  render() {
    const response = () => {
      if (this.props.error) {
        return <div class="ui negative message">
                <div class="header">
                  Whoops, something went wrong there.
                </div>
              </div>
      } else if (this.props.user) {
        return <div class="ui success message">
                <div class="header">
                  Your user registration was successful.
                </div>
                <p>You may now log in with your username</p>
              </div>
      } else {
        return null;
      }
    };

    return (
      <div>
        <div className={classes.headerSection}>
          <h1 className={classes.header}>Sign up for NewsHub.</h1>
          <p className={classes.text}>Use whatever email you check most. You'll login with your username.</p>
        </div>
        <div className="ui container">
          <div className={classes.main}>
            <div className="ui centered grid">
              <div className="ten wide column">
                {response()}
                <Form onSubmit={this.handleSubmit} error={this.props.error}
                  requestingCreateUser={this.props.requestingCreateUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
