import React, { PropTypes } from 'react'
import { Notification, Loading } from '../'
import classes from './Styles.scss';
import classNames from 'classnames';

const notifications = classNames(
  classes.notifications,
  classes.fixedNavbarOffset
);

export default class Notifications extends React.Component {
  static defaultProps = {
    notifications: []
  };
  static propTypes = {
    notifications: PropTypes.array.isRequired,
  };
  state = {
    loading: this.props.loading,
  };
  componentWillReceiveProps(nextProps) {
    this.state.loading = nextProps.loading;
  }
  render() {
    var notification = function(notification) {
      return <Notification title={notification.title} body={notification.body} />
    };
    return (
      <ul className={notifications}>
        <Loading display={this.state.loading} />
        {this.props.notifications.map(notification)}
      </ul>
    );
  }
}
