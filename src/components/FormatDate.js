import React, { PropTypes } from 'react';
import moment from 'moment';

export default class FormatDate extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
  };
  formatDate = () => {
    return moment(this.props.date).format("MM/DD/YY");
  };
  render() {
    return (
      <span>{this.formatDate()}</span>
    );
  }
};
