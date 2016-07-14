import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import Item from './Item';

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
        <div className="ui row">
          <h1 className={classes.groupHeader}>{this.props.name}</h1>
        </div>
        <div className="ui four cards">
          {renderDevices()}
        </div>
      </div>
    )
  }
}
