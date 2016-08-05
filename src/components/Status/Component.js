import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import reservation from 'modules/reservation/utils';

export default class Status extends React.Component {
  render() {
    const color = reservation.getReservationColor(this.props.data);
    const status = reservation.getReservationStatus(this.props.data);
    const style = {
      backgroundColor: color,
    };

    return (
      <span className={classes.status} style={style}>
        <span className={classes.text}>{status}</span>
      </span>
    );
  }
}
