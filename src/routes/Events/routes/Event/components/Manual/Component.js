import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Status } from './components';
import event from 'modules/event/utils';
import user from 'modules/user/utils';
import _ from 'lodash';

export default class Manual extends React.Component {
  state = {
    focused: false,
    displayUser: false,
    barcode: '',
  };
  componentDidMount() {
    // get users
  }
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.actions.createLog({
      barcode: this.state.barcode,
      eventId: this.props.event.id,
    });
  };
  componentWillReceiveProps(nextProps) {
  }
  render() {
    return (
      <div></div>
    );
  }
}
