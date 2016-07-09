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
    });
  };
  render() {
    return (
      <div className="ui container">
        <div className={classes.main}>
          <Form onSubmit={this.handleSubmit} error={this.props.error}
            requestingCreateUser={this.props.requestingCreateUser} />
        </div>
      </div>
    );
  }
}
