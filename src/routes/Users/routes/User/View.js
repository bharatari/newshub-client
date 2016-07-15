import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response } from 'components/';
import { Admin, Content } from './components';

export default class UserView extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    requestingUser: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.fetchUser(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
  }
  render() {
    const { user, requestingUser, actions, currentUrl } = this.props;
    const successHeader = 'You successfully updated this user.';

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="User" loading={requestingUser}>
          <div>
          </div>
        </SidebarPage>
      </div>
    );
  }
}
