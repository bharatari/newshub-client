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
    const { currentUser, user, requestingUser, error, actions, currentUrl } = this.props;
    const successHeader = 'You successfully updated this user.';

    return (
      <div>
        <Response error={this.props.error} successHeader={successHeader} />
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="User" loading={requestingUser} user={currentUser}>
          {
            user ? 
            <Content user={this.props.user} actions={actions} currentUser={currentUser} /> :
            <TextLoading loading={requestingUser} /> 
          }
        </SidebarPage>
      </div>
    );
  }
}
