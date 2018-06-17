import React, { PropTypes } from 'react';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import classes from './Styles.scss';
import { configuration } from 'constants/routes';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import * as notifications from 'modules/notifications/actions';
import * as user from 'modules/user/actions';
import * as authentication from 'modules/authentication/actions';
import { Menu, Icon, Layout } from 'antd';

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
    collapsed: true,
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
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  handleClick = (item, key, keyPath) => {
    this.props.actions.push(item.key);
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
            if (this.currentRoute(route.url)) {

            }

            routes.push(
              <Menu.Item key={route.url}>
                <Icon type={route.icon} />
                <span>{route.label}</span>
              </Menu.Item>
            );
          }
        }
      });
      
      return routes;
    }
    
    const organization = this.props.user.currentOrganization;

    return (
      <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu mode="inline" theme="dark" onClick={this.handleClick}>
          {getRoutes()}
        </Menu>
      </Layout.Sider>
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
