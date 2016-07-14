import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactWinJS from 'react-winjs';

export default class Device extends React.Component {
  static propTypes = {
    devices: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  render() {
    const renderDevices = () => {
      let list = [];

      this.props.devices.forEach((device) => {
        list.push(
           <Item
            key={device.id}
            device={device}
            onClick={this.props.onClick} />
        );
      });

      return list;
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="device-group"
          component="div"
          className="ui four cards"
          transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {renderDevices()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
