import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/index.css';

export default class Card extends React.Component {
  handleBlur = (moment) => {
    this.props.onBlur(moment.toISOString());
  };
  handleFocus = (e) => {
    this.props.onFocus(e);
  };
  handleChange = (moment) => {
    this.props.onChange(moment.toISOString());
    this.props.onFocus(moment.toISOString());
    this.props.onBlur(moment.toISOString());
  };
  render() {
    return (
      <DatePicker onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} showTime={true} />
    );
  }
}
