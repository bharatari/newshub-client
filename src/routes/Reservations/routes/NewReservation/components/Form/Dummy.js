import React, { PropTypes } from 'react';
import Device from './Device';
import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import array from 'utils/array';
import classes from './Styles.scss';
import Group from './Group';

export default class Dummy extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    remainingDevices: PropTypes.object,
    selectedDevices: PropTypes.array,
  };
  componentDidMount() {
    this.props.onChange(this.props.selectedDevices);
  }
  componentWillReceiveProps(nextProps) {
    this.props.onChange(nextProps.selectedDevices);
  }
  render() {
    return null;
  }
}
