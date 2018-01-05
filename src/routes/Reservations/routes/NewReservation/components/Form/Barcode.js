import React, { PropTypes } from 'react';
import classes from './Styles.scss';

export default class Barcode extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.device.requesting && !this.props.device.device) {
      if (!nextProps.device.requesting && nextProps.device.device) {
        this.props.onChange(nextProps.device.device);
      }
    }
  }
  handleChange = (e) => {
    this.props.actions.resetFetchDevice();

    this.props.actions.fetchDeviceByBarcode(e.target.value);
  };
  render() {
    return (
      <div className="ui search">
        <div className="ui icon input">
          <input name="barcode" className="prompt" type="text" onChange={this.handleChange} className={classes.font} placeholder="Click to scan barcode" />
          <i className="barcode icon"></i>
        </div>
      </div>
    );
  }
}
