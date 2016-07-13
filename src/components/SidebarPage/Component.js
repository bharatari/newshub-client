import React from 'react';
import classes from './Styles.scss';
import Sidebar from './Sidebar';
import classNames from 'classnames';
import { Notifications } from 'components/'

const main = classNames(
  classes.main,
  'ui container'
);

export default class SidebarPage extends React.Component {
  render() {
    return (
      <div className={main}>
        <Notifications loading={this.props.loading} />
        <Sidebar {...this.props} />
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarContainerHeaderBar}>
              <div className="row">
                <div>
                  <h1 className={classes.sidebarContainerHeader}>{this.props.header}</h1>
                </div>
                <div className={classes.sidebarContainerHeaderRight}>
                  {this.props.right}
                </div>
              </div>
          </div>

          <div className={classes.sidebarContainerPadding}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};
