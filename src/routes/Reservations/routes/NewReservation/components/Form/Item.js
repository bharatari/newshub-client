import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';

const header = classNames(
  'header',
  classes.font
);

const button = classNames(
  'ui button attached button',
  classes.font
);

export default class Item extends React.Component {
  static propTypes = {
    device: PropTypes.object.isRequired,
  };
  handleClick = () => {
    this.props.device.reservedQuantity = 1;

    this.props.onClick(this.props.device);
  };
  render() {
    const { thumbnail } = this.props.device;

    const add = (
      <div className={button} onClick={this.handleClick}>
        <i className="add icon"></i>
        Add
      </div>
    );
  
    const showAdd = () => {
      if (this.props.device.availableQuantity < 1) {
        return null;
      } else {
        if (this.props.device.disabled) {
          return null;
        }
        
        return add;
      }
    };

    const specialApproval = () => {
      if (this.props.device.specialApproval) {
        return <p className={classes.specialApproval}>Requires special approval</p>;
      }
    };

    const card = classNames(
      'card',
      classes.font,
      { [classes.cardDisabled]: this.props.device.disabled }
    );

    return (
      <div className={card}>
        <div className="image">
          { thumbnail ? <img src={thumbnail.url} /> : null }
        </div>
        <div className="content">
          <a className={header}>{this.props.device.label}</a>
          <div className="meta">
            <p>{this.props.device.name}</p>
            <p>{this.props.device.type}</p>
          </div>
          <div className="description">
            {this.props.device.description}
            <p>{this.props.device.availableQuantity} available</p>
            {specialApproval()}
          </div>
        </div>
        {showAdd()}
      </div>
    )
  }
}
