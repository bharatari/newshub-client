import Datetime from 'react-datetime';
import React, { PropTypes } from 'react'
import classes from './Styles.scss';
import classNames from 'classnames';
import { AutoComplete as Complete } from 'antd';
import moment from 'moment';
import _ from 'lodash';

export default class AutoComplete extends React.Component {
  handleSearch = (value) => {
    this.props.onSearch(value);
    this.props.onFocus(value);
  };
  handleChange = (value) => {
    this.props.onChange(value);
    this.props.onBlur(value);
  };
  render() {
    const { data, placeholder } = this.props;

    return (
      <Complete dataSource={data} onChange={this.handleChange} onSearch={this.handleSearch} placeholder={placeholder} />
    );
  }
}
