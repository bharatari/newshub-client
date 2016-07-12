import React, { PropTypes } from 'react'
import classes from './Styles.scss';

export default class Item extends React.Component {
  static propTypes = {
    device: PropTypes.object.isRequired,
  };
  handleClick = () => {
    this.props.device.reservedQuantity = 1;

    this.props.onClick(this.props.device);
  };
  render() {
    return (
      <div className="card">
        <div className="image">
          <img />
        </div>
        <div className="content">
          <a className="header">{this.props.device.label}</a>
          <div className="meta">
            <p>{this.props.device.name}</p>
            <p>{this.props.device.type}</p>
          </div>
          <div className="description">
            {this.props.device.description}
            <p>{this.props.device.availableQuantity} available</p>
          </div>
        </div>
        <div className="ui bottom attached button" onClick={this.handleClick}>
          <i className="add icon"></i>
          Add
        </div>
      </div>
    )
  }
}
