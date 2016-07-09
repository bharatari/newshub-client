import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Form } from './components';

const main = classNames(
  'ui middle aligned center aligned grid',
  classes.main
);

export default class LoginView extends React.Component {
  static propTypes = {
    requestingLogin: PropTypes.bool,
    error: PropTypes.any,
    authenticated: PropTypes.bool,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.login({
      username: values.username,
      passsword: values.password,
    });
  };
  render() {
    return (
      <div className="ui container">
        <div className={main}>
          <div className="four wide column">
            <h2 className={classes.header}>Login</h2>
            <Form onSubmit={this.handleSubmit} requestingLogin={this.props.requestingLogin}
              error={this.props.error} />
          </div>
        </div>
      </div>
    );
  }
}
