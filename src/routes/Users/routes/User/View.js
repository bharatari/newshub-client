import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content } from './components';

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
    if (nextProps.updatedUser && !nextProps.requestingUpdateUser) {
      if (!this.state.updated) {
        this.props.actions.fetchUser(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateUser) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { currentUser, user, requestingUser, error, actions, currentUrl, updatedUser, requestingUpdateUser } = this.props;
    const successHeader = 'You successfully updated this user.';

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="User" loading={requestingUser || requestingUpdateUser} user={currentUser}>
          <Card column="sixteen">
            <Response error={this.props.updateError} response={this.props.updatedUser}
            successHeader={successHeader} />
            {
              user ? 
              <Content user={this.props.user} actions={actions} currentUser={currentUser} /> :
              <TextLoading loading={requestingUser} /> 
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
