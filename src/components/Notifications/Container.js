import React, { PropTypes } from 'react';
import { Notifications } from '../';

export default class NotificationsContainer extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Notifications loading={this.props.loading} />
      </div>
    );
  }
}
