import React, { PropTypes } from 'react';
import moment from 'moment';

export default class Date extends React.Component {
  state = {
    date: moment().format("MM/DD/YY"),
  };
  tick = () => {
    this.setState({
      date: moment().format("MM/DD/YY"),
    });
  };
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <span>{this.state.date}</span>
    );
  }
};
