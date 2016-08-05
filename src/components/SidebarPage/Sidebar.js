import React, { PropTypes } from 'react';
import classNames from 'classnames';
import classes from './Styles.scss';
import { navigationRoutes } from 'constants/routes';
import user from 'modules/user/utils';

const sidebar = classNames(
  'desktop-only',
  classes.sidebar,
  classes.sidebarLeft,
);

const list = classNames(
  'ui list',
  classes.list
)

const mobileSidebar = classNames(
  'ui inverted vertical menu mobile-only newshub-sidebar'
);

export default class Sidebar extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    actions: PropTypes.object,
    user: PropTypes.object,
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
  render() {
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

      return (
        <div className={buttons}>
          <a href="#" key="1" className={link}>
            <i className={person}></i><span className={classes.linkText}>{this.props.user.firstName}</span>
          </a>
          <a href="#" key="2" className={link}>
            <i className={locked}></i><span className={classes.linkText}>Logout</span>
          </a>
        </div>
      );
    };

    const getRoutes = () => {
      let routes = [];
      
      navigationRoutes.forEach((route) => {
        if (!route.admin) {
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
        } else {
          if (user.isAdmin(this.props.user)) {
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
            <p className={classes.brand}>UTD TV</p>
          </div>
          <div className={list}>
            {getRoutes()}
          </div>
          {getButtons()}
        </div>
        <div className={mobileSidebar}>
          <div className={classes.logo}>
            <p className={classes.brand}>UTD TV</p>
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