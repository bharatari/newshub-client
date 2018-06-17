import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import Sidebar from './Sidebar';
import classNames from 'classnames';
import { Notifications } from 'components/';
import { Layout, Header, Content, Footer, Icon, Menu, Badge, Dropdown, Avatar } from 'antd';

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
    roles: PropTypes.array.isRequired,
  };
  state = {
    active: false,
    collapsed: true,
  };
  handleClick = () => {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Icon type="solution" />
          <span className={classes.dropdownText}>Profile</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type="reload" />
          <span className={classes.dropdownText}>Switch Organizations</span>
        </Menu.Item>
        <Menu.Item>
          <Icon type="logout" />
          <span className={classes.dropdownText}>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Notifications loading={this.props.loading} />
        <Sidebar {...this.props} active={this.state.active} />
        <Layout>
          <Layout.Header style={{ background: '#fff' }}>
            <p className={classes.sidebarContainerHeader}>{this.props.header}</p>

            <div className={classes.sidebarContainerHeaderRight}>
              {this.props.right}
              <Badge count={0} showZero style={{ display: 'inline-block' }}>
                <Icon type="bell" style={{ marginLeft: '20px' }}/>
              </Badge>

              <Avatar type="user" style={{ display: 'inline-block', marginLeft: '30px' }} />
              <Dropdown overlay={menu} style={{ display: 'inline-block', marginLeft: '30px' }} >
                <a className="ant-dropdown-link" target="_blank" style={{ marginLeft: '10px', color: 'black' }}>
                  {this.props.user.firstName} <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Layout.Header>
          <Layout.Content style={{ margin: '0 16px', paddingTop: '25px', paddingLeft: '30px', paddingRight: '30px' }}>
            {this.props.children}
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            Hello from Richardson.
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}
