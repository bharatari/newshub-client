import React, { PropTypes } from 'react'
import { Notification, Loading } from '../'

export default class Notifications extends React.Component {
    static defaultProps = {
      notifications: []
    }
    static propTypes = {
      notifications: PropTypes.array.isRequired
    }
    state = {
      loading: this.props.loading
    }
    componentWillReceiveProps = (nextProps) => {
      this.state.loading = nextProps.loading;
    }
    render() {
      var notification = function(notification) {
        return <Notification title={notification.title} body={notification.body} />
      };
      return (
        <ul className="notifications fixed-navbar-offset">
          <Loading display={this.state.loading} />
          {this.props.notifications.map(notification)}
        </ul>

      )
    }
}
