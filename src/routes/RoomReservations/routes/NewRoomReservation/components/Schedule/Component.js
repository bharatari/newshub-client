import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

BigCalendar.momentLocalizer(moment);

export default class Content extends React.Component {
  events = () => {
    const array = [];

    for (let i = 0; i < this.props.roomReservations.length; i++) {
      array[i] = {
        ...this.props.roomReservations[i],
        startDate: moment(this.props.roomReservations[i].startDate).toDate(),
        endDate: moment(this.props.roomReservations[i].endDate).toDate(),
      };
    }

    return array;
  };
  render() {
    return (
      <div className={classes.schedule}>
        <h2 className={classes.header}>Availability</h2>
        <BigCalendar
          events={this.events()}
          startAccessor='startDate'
          endAccessor='endDate'
          titleAccessor='purpose'
        />
      </div>
    );
  }
}
