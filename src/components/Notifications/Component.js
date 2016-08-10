import React, { PropTypes } from 'react';
import Notification from './Notification';
import Loading from './Loading';
import classes from './Styles.scss';
import classNames from 'classnames';

const notifications = classNames(
  classes.notifications
);

export default class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
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
    const notification = (notification) => {
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
