import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Admin, Devices } from '../';
import user from 'modules/user/utils';

export default class Content extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };
  render() {
    return (
      <div>
      </div>
    );
  }
}
