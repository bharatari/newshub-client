import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import Form from './Form';
import { Menu, Dropdown, Icon } from 'antd';

export default class AdminNotes extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
    requestingReservation: PropTypes.bool,
  };
  handleAdminNotes = (values) => {
    this.props.actions.updateReservation(this.props.reservation.id, values);
  };
  render() {
    const { reservation } = this.props;
    // Content should appear as static by default, triggers modal on edit
    return (
      <div>
        <Form onSubmit={this.handleAdminNotes} />
      </div>
    );
  }
}
