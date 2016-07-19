import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import CoreLayout from 'layouts/Core/CoreLayout';
import { RightNavbar, Sidebar } from './components';
import { nonSidebarRoutes } from 'constants/routes';
import _ from 'lodash';

const button = classNames(
  'mobile-only toggle-button',
  classes.button
);

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

    let leftNavbar;

    if (_.includes(nonSidebarRoutes, this.props.currentUrl)) {
      leftNavbar = null;
    } else {
      leftNavbar = <button className={button}>
                    <i className="content icon"></i>
                  </button>;
    }

    return (
      <CoreLayout rightNavbar={rightNavbar} leftNavbar={leftNavbar}>
        {this.props.children}
      </CoreLayout>
    );
  }
}
