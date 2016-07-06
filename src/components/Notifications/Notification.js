import React from 'react'

export default class Notification extends React.Component {
  render() {
    return (
      <li className="notification">
        <div>
          <a href="#" className="notification-close">CLOSE</a>
          <p className="notification-header">{this.props.title}</p>
          <p className="notification-text">{this.props.body}</p>
        </div>
      </li>
    );
  }
}
