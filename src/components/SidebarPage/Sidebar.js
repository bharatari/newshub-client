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
import * as notifications from 'modules/notifications/actions';
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
  state = {
    switchedOrganization: false,
  };
  componentDidMount() {
    $('.ui.dropdown')
      .dropdown()
    ;
  }
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
  handleOrganizationClick = (id) => {
    this.props.actions.switchOrganization(this.props.user.id, id);
  };
  componentWillReceiveProps(nextProps) {
    if ((this.props.requestingSwitchOrganization && !nextProps.requestingSwitchOrganization) && nextProps.switchOrganization && !this.state.switchedOrganization) {
      this.setState({
        switchedOrganization: true,
      });
      
      this.props.actions.push('/');

      this.props.actions.pushNotification({
        title: `Switched to ${nextProps.switchOrganization.currentOrganization.label}`,
        body: 'To switch organizations again, use the organization switcher in the sidebar.',
      });
    } else if ((this.props.requestingSwitchOrganization && !nextProps.requestingSwitchOrganization) && nextProps.switchOrganizationError) {
      this.props.actions.pushNotification({
        title: 'Error',
        body: 'Could not switch organizations. Try again later.',
      });
    }

    if (nextProps.requestingSwitchOrganization) {
      this.setState({
        switchedOrganization: false,
      });
    }
  }
  render() {
    const mobileSidebar = classNames(
      'ui inverted vertical mobile-only newshub-sidebar',
      classes.sidebarMobile,
      { active: this.props.active }
    );

    const organizationSelectorText = classNames(
      'text',
      classes.organizationSelectText,
      classes.link
    );

    const organizationDropdown = classNames(
      'ui inline dropdown',
      classes.organizationDropdown
    );

    const dropdown = () => {
      const organization = this.props.user.currentOrganization;
      const organizations = this.props.user.organizations;

      const list = [];

      for (let i = 0; i < organizations.length; i++) {
        const item = (
          <div key={i} className="item" onClick={() => this.handleOrganizationClick(organizations[i].id)}>
            <img className="ui avatar image" src={organizations[i].logo} />
            {organizations[i].label}
          </div>
        );

        list.push(item);
      }

      return (
        <div className={organizationDropdown}>
          <div className={organizationSelectorText}>
            {organization.label}
          </div>
          <div className="menu">
            {list}
          </div>
        </div>
      );
    };

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
      const loop = classNames(
        'ion-loop',
        classes.icon
      );
      
      let user;
      if (this.props.user) {
        user = <a href="#" key="user" className={link} onClick={this.handleUser}>
          <i className={person}></i><span className={classes.linkText}>{this.props.user.firstName}</span>
        </a>
      } else {
        user = <a href="#" key="user" className={link}>
          <span className={classes.linkText}></span>
        </a>
      }

      return (
        <div className={buttons}>
          {dropdown()}
          {user}
          <a href="#" key="locked" className={link} onClick={this.handleLogout}>
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
    
    const organization = this.props.user.currentOrganization;

    return (
      <div>
        <div className={sidebar}>
          <div className={classes.logo}>
            <a className={classes.brandLink} href="#"><p className={classes.brand}>{organization.label}</p></a>
          </div>
          <div className={list}>
            {getRoutes()}
          </div>
          <hr className={classes.divider} />
          {getButtons()}
        </div>
        <div className={mobileSidebar}>
          <div className={list}>
            {getRoutes()}
          </div>
          <hr className={classes.divider} />
          {getButtons()}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  requestingSwitchOrganization: state.user.switchOrganization.requesting,
  switchOrganization: state.user.switchOrganization.user,
  switchOrganizationError: state.user.switchOrganization.error,
});

const actionCreators = {
  ...routerActions,
  ...authentication,
  ...notifications,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
