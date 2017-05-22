import React, { PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import classes from './Styles.scss';
import { configuration } from 'constants/routes';
import config from 'constants/config';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import * as user from 'modules/user/actions';
import * as authentication from 'modules/authentication/actions';

const sidebar = classNames(
  'desktop-only',
  classes.sidebar,
  classes.sidebarLeft,
);

const list = classNames(
  'ui list',
  classes.list
);

class Sidebar extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    actions: PropTypes.object,
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
  };
  currentRoute = (url) => {
    if (url === this.props.currentUrl) {
      return true;
    } else {
      return false;
    }
  };
  handleClick = (route, event) => {
    event.preventDefault();
    this.props.actions.push(route.url);
  };
  handleLogout = () => {
    this.props.actions.logout();
  };
  handleUser = () => {
    this.props.actions.push('/app/user/' + this.props.user.id);
  };
  render() {
    const mobileSidebar = classNames(
      'ui inverted vertical menu mobile-only newshub-sidebar',
      { active: this.props.active }
    );
    const getButtons = () => {
      const link = classNames(
        'item',
        classes.link
      );
      const buttons = classNames(
        classes.buttons,
        'ui list'
      );
      const person = classNames(
        'ion-person',
        classes.icon
      );
      const locked = classNames(
        'ion-locked',
        classes.icon
      );
      
      let user;
      if (this.props.user) {
        user = <a href="#" key="1" className={link} onClick={this.handleUser}>
          <i className={person}></i><span className={classes.linkText}>{this.props.user.firstName}</span>
        </a>
      } else {
        user = <a href="#" key="1" className={link}>
          <span className={classes.linkText}></span>
        </a>
      }

      return (
        <div className={buttons}>
          {user}
          <a href="#" key="2" className={link} onClick={this.handleLogout}>
            <i className={locked}></i><span className={classes.linkText}>Logout</span>
          </a>
        </div>
      );
    };

    const getRoutes = () => {
      let routes = [];

      configuration.routes.forEach((route) => {
        const role = access.getRole(route.url);

        if (route.sidebar) {
          if (access.has(this.props.roles, role)) {
            let boundClick = this.handleClick.bind(this, route);
            let link;
            
            if (this.currentRoute(route.url)) {
              link = classNames(
                'item',
                classes.link,
                classes.active
              );
            } else {
              link = classNames(
                'item',
                classes.link
              );
            }

            const icon = classNames(
              route.icon,
              classes.icon
            );
            
            routes.push(
              <a href="#" key={route.url} className={link} onClick={boundClick}>
                <i className={icon}></i><span className={classes.linkText}>{route.label}</span>
              </a>
            );
          }
        }
      });
      
      return routes;
    }
    
    return (
      <div>
        <div className={sidebar}>
          <div className={classes.logo}>
            <a className={classes.brandLink} href={config.brandLink}><p className={classes.brand}>{config.brand}</p></a>
          </div>
          <div className={list}>
            {getRoutes()}
          </div>
          {getButtons()}
        </div>
        <div className={mobileSidebar}>
          <div className={classes.logo}>
            <p className={classes.brand}>{config.brand}</p>
          </div>
          <div className={list}>
            {getRoutes()}
          </div>
          {getButtons()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({});

const actionCreators = {
  ...routerActions,
  ...authentication,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
