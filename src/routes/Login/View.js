import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import config from 'constants/config';
import { Response } from 'components/';
import { Form } from './components';

const main = classNames(
  'twelve wide phone eight wide tablet four wide computer column',
  classes.main
);

const styles = {
  backgroundImage: 'url(' + config.loginBackground + ')',
};

export default class LoginView extends React.Component {
  static propTypes = {
    requestingLogin: PropTypes.bool,
    error: PropTypes.any,
    response: PropTypes.any,
    actions: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetLogin();
  }
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
    return (
      <div className={classes.background} style={styles}>
        <div className="ui container">
          <div className="ui middle aligned center aligned grid">
            <div className={main}>
              <h2 className={classes.brand}>{config.brand}</h2>
              <Response error={this.props.error} />
              <Form onSubmit={this.handleSubmit} requestingLogin={this.props.requestingLogin}
                actions={this.props.actions} response={this.props.response} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
