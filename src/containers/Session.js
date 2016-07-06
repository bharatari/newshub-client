import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import * as user from 'modules/user/actions';
import { routeActions } from 'react-router-redux';

export default function session(Component) {
  class SessionComponent extends React.Component {
    componentWillMount() {
      this.props.actions.fetchAuthenticated();
      this.props.actions.fetchUser();
    }
    render() {
      return <Component user={this.props.user} 
               authenticated={this.props.authenticated}
               {...this.props} 
             />;
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingAuthenticated: state.authentication.requestingAuthenticated,
    requestingUser: state.user.requestingUser,
    user: state.user.user,
    authenticated: state.authentication.authenticated,
  });

  const actionCreators = {
    ...routeActions,
    ...authentication,
    ...user,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(SessionComponent);
}
