import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import authentication from 'modules/authentication/utils';

const button = classNames(
  'ui inverted red button button-light'
);

export default class BidList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    actions: PropTypes.object,
  };
  handleLogout = () => {
    authentication.logout();
  };
  handleLogin = () => {
    this.props.actions.push('/app/login');
  };
  render() {
    const logout = <button className={button} onClick={this.handleLogout}>Logout</button>;
    const login = <button className={button} onClick={this.handleLogin}>Login</button>;
      
    const userName = this.props.data.user ? 
                     this.props.data.user.firstName + ' ' + this.props.data.user.lastName : 
                     null;
    
    return (
      <ul className={classes.horizontal}>
        { this.props.data.user ? logout : login}
      </ul>
    );
  }
}
