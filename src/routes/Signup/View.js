import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Form } from './components';
import { Response } from 'components/';

export default class LoginView extends React.Component {
  static propTypes = {
    requestingCreateUser: PropTypes.bool,
    error: PropTypes.any,
    user: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.createUser(values);
  };
  render() {
    const responseHeader = 'Your user registration was successful.';
    const responseText = 'You may now log in with your username';

    return (
      <div>
        <div className={classes.headerSection}>
          <h1 className={classes.header}>Sign up for NewsHub.</h1>
          <p className={classes.text}>Use whatever email you check most. You'll login with your username.</p>
        </div>
        <div className="ui container">
          <div className={classes.main}>
            <div className="ui centered grid">
              <div className="sixteen wide phone ten wide computer column">
                <Response error={this.props.error} response={this.props.user}
                  successHeader={responseHeader} successText={responseText} />
                <Form onSubmit={this.handleSubmit} error={this.props.error}
                  requestingCreateUser={this.props.requestingCreateUser}
                  user={this.props.user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
