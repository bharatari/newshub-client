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
      password: values.password,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (!nextProps.requestingLogin && nextProps.response) {
      if (nextProps.query.next) {
        this.props.actions.push(nextProps.query.next);
      } else {
        this.props.actions.push('/');
      }
    }
  }
  render() {
    const response = () => {
      if (this.props.error) {
        return <div className="ui negative message">
                <div className="header">
                  Whoops, something went wrong there. Check your fields and try again.
                </div>
              </div>
      } else {
        return null;
      }
    };

    return (
      <div className="ui container">
        <div className={main}>
          <div className="four wide column">
            <h2 className={classes.header}>Login</h2>
            {response()}
            <Form onSubmit={this.handleSubmit} requestingLogin={this.props.requestingLogin}
              error={this.props.error} actions={this.props.actions} response={this.props.response} />
          </div>
        </div>
      </div>
    );
  }
}
