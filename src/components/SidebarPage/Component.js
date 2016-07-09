import React from 'react';
import classes from './Styles.scss';
import Sidebar from './Sidebar';
import classNames from 'classnames';

const main = classNames(
  classes.main,
  'ui container'
);

export default class SidebarPage extends React.Component {
  render() {
    return (
      <div className={main}>
        <Sidebar {...this.props} />
        <div className={classes.sidebarContainer}>
          <h1 className={classes.sidebarContainerHeader}>{this.props.header}</h1>
          <div className={classes.sidebarContainerPadding}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};
