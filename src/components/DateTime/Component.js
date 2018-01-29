import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import 'react-datetime/css/react-datetime.css';

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
      <Datetime onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} input={false} />
    );
  }
}
