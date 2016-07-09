import React from 'react';
import classes from './Styles.scss';

export default class Notification extends React.Component {
  render() {
    return (
      <li className={classes.notification}>
        <div>
          <a href="#" className={classes.notificationClose}>CLOSE</a>
          <p className={classes.notificationHeader}>{this.props.title}</p>
          <p className={classes.notificationText}>{this.props.body}</p>
        </div>
      </li>
    );
  }
}
