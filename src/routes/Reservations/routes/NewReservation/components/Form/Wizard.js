import React, { PropTypes } from 'react';
import Device from './Device';
import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import array from 'utils/array';
import classes from './Styles.scss';

export default class NewReservationWizard extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    remainingDevices: PropTypes.array,
  };
  handleClick = (device) => {
    let selectedDevices = [
      ...this.props.value,
      device,
    ];

    this.props.onChange(selectedDevices);
  };
  handleChange = (device) => {
    let selectedDevices = this.props.value;
    selectedDevices = array.updateById(selectedDevices, device.id, device);

    this.props.onChange(selectedDevices);
  };
  remove = (id) => {
    let selectedDevices = [
      ...this.props.value,
    ];
    selectedDevices = array.deleteFromArrayById(selectedDevices, id);

    this.props.onChange(selectedDevices);
  };
  render() {
    const renderList = () => {
      let list = [];

      if (this.props.value) {
        this.props.value.forEach((device) => {
          list.push(
            <Device
              key={device.id}
              device={device}
              onChange={this.handleChange}
              remove={this.remove} />
          );
        });
      }
      
      return list;
    }

    const renderGrid = () => {
      let list = [];

      if (this.props.remainingDevices) {
        this.props.remainingDevices.forEach((device) => {
          list.push(
            <Item
              key={device.id}
              device={device}
              onClick={this.handleClick} />
          );
        });
      }

      return list;
    }

    return (
      <div>
        <div className="ui cards">
          {renderGrid()}
        </div>
        <div className={classes.reservationDeviceContainer}>
          <ReactCSSTransitionGroup
            transitionName="reservation-device"
            transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              {renderList()}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}
