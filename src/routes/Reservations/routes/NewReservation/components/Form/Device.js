import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';

export default class Device extends React.Component {
  static propTypes = {
    device: PropTypes.object.isRequired,
  };
  add = (e) => {
    let device = this.props.device;

    if (this.props.device.availableQuantity > this.props.device.reservedQuantity) {
      device.reservedQuantity++;
    }

    this.props.onChange(device);
  };
  subtract = () => {
    let device = this.props.device;

    if (this.props.device.reservedQuantity > 1) {
      device.reservedQuantity--;
    }

    this.props.onChange(device);
  };
  remove = () => {
    this.props.remove(this.props.device.id);
  };
  render() {
    return (
      <div className={classes.reservationDevice}>
        <p className={classes.reservationDeviceLabel}>{this.props.device.label}</p>
        <div className="ui icon blue button button-light" onClick={this.add}>
          <i className="plus icon"></i>
        </div>
        <span className={classes.reservationDeviceQuantity}>{this.props.device.reservedQuantity}</span>
        <div className="ui icon red button button-light" onClick={this.subtract}>
          <i className="minus icon"></i>
        </div>
        <div className="ui animated button blue button-light right floated" onClick={this.remove}>
          <div className="visible content">DELETE</div>
          <div className="hidden content">
            <i className="trash icon"></i>
          </div>
        </div>
      </div>
    )
  }
}
