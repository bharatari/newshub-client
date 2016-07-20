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
  render() {
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
          
          routes.push(
            <a href="#" key={route.url} className={link} onClick={boundClick}>{route.label}</a>
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
            
            routes.push(
              <a href="#" key={route.url} className={link} onClick={boundClick}>{route.label}</a>
            );
          }
        }
      });
      
      return routes;
    }
    
    return (
      <div>
        <div className={sidebar}>
          <div className="ui list">
            {getRoutes()}
          </div>
        </div>
        <div className={mobileSidebar}>
          {getRoutes()}
        </div>
      </div>
    )
  }
};