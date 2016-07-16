import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import CoreLayout from 'layouts/Core/CoreLayout';
import { RightNavbar, Sidebar } from './components';

export default class CoreView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  render() {
    let data = {};

    if (this.props.user) {
      data.user = this.props.user;
    }

    const rightNavbar = <RightNavbar data={data} actions={this.props.actions} />;
    
    return (
      <CoreLayout rightNavbar={rightNavbar}>
        {this.props.children}
      </CoreLayout>
    );
  }
}
