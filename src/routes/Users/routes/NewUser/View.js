import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Response, Card } from 'components/';

export default class NewUserView extends React.Component {
  static propTypes = {

  };
  handleClick = () => {
    this.props.actions.createSignupToken();
  };
  render() {
    const button = classNames(
      'ui button inverted blue button-light',
      { loading: this.props.requestingToken }
    );

    let header;
    let text;

    if (this.props.token) {
      header = 'The generated token is ' + this.props.token.token;
      text = 'Provide this to your new user and direct them to the sign up page.';
    }

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New User" loading={this.props.requestingToken} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            <Response error={this.props.error} response={this.props.token}
              successHeader={header} successText={text} />
            <p className={classes.info}>
              For members to be able to sign up for an account, they will need a one-time-use token
              generated from this page.
            </p>
            <button className={button} onClick={this.handleClick}>GENERATE TOKEN</button>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
