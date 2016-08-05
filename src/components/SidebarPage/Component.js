import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import Sidebar from './Sidebar';
import classNames from 'classnames';
import { Notifications } from 'components/'

const main = classNames(
  classes.main
);

const padding = classNames(
  classes.sidebarContainerPadding
);

const button = classNames(
  'toggle-button',
  classes.button
);

export default class SidebarPage extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  handleClick = () => {
    if ($('.newshub-sidebar').hasClass('active')) {
      $('.newshub-sidebar').removeClass('active');
    } else {
      $('.newshub-sidebar').addClass('active');
    }
  }
  render() {    
    return (
      <div className={main}>
        <Notifications loading={this.props.loading} />
        <Sidebar {...this.props} />
        <div className={classes.sidebarContainer}>
          <div className={classes.sidebarContainerHeaderBar}>
            <div className="ui container">
              <div className="row">
                <div className={classes.sidebarContainerHeaderContent}>
                  <button className={button} onClick={this.handleClick}>
                    <i className="content icon"></i>
                  </button>
                  <h1 className={classes.sidebarContainerHeader}>{this.props.header}</h1>
                </div>
                <div className={classes.sidebarContainerHeaderRight}>
                  {this.props.right}
                </div>
              </div>
            </div>
          </div>
          <div className={padding}>
            <div className="ui container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
