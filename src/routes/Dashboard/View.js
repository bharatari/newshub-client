import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage } from 'components/';

export default class HomeView extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    products: PropTypes.array,
    user: PropTypes.object,
    authenticated: PropTypes.bool,
  };
  render() {
    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Dashboard" />
      </div>
    );
  }
}
