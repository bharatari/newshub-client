import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as user from 'modules/user/actions';
import { defaultRedirect } from 'constants/keys';
import { routerActions } from 'react-router-redux';
import authenticated from './Authenticated';
import userUtils from 'modules/user/utils';
import { Unauthorized } from 'components/';

export default function admin(Component) {
  class AdminComponent extends React.Component {
    render() {
      return (
        userUtils.isAdmin(this.props.user) ?
        this.props.children :
        <Unauthorized />
      );
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingUser: state.user.fetchCurrentUser.requesting,
    user: state.user.fetchCurrentUser.user,
  });

  const actionCreators = {
    ...routerActions,
    ...user,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(AdminComponent);
}
