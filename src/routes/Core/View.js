import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import CoreLayout from 'layouts/Core/CoreLayout';

export default class CoreView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
  };
  state = {};
  render() {
    return (
      <CoreLayout rightNavbar={rightNavbar}>
        {this.props.children}
      </CoreLayout>
    );
  }
}
