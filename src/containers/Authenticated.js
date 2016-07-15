import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import * as user from 'modules/user/actions';
import { loginRedirect } from 'constants/keys';
import { routeActions } from 'react-router-redux';

export default function authenticated(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.actions.fetchAuthenticated();
      this.props.actions.fetchUser();
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requestingAuthenticated && !nextProps.authenticated) {
        if (nextProps.currentRoute !== loginRedirect) {
          setTimeout(() => {
            this.props.actions.replace(loginRedirect + '?next=' + nextProps.currentRoute);
          }, 2000);
        }
      }

      if (nextProps.logout && (nextProps.currentRoute !== loginRedirect)) {
        this.props.actions.replace(loginRedirect);
      }
    }
    render() {
      return (
        <div>
          {
            this.props.authenticated
            ? <Component user={this.props.user} 
               authenticated={this.props.authenticated}
               {...this.props} />
            : null
          }
        </div>
      )
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingAuthenticated: state.authentication.requestingAuthenticated,
    authenticated: state.authentication.authenticated,
    requestingUser: state.user.fetchUser.requesting,
    user: state.user.fetchUser.user,
    currentRoute: state.router.location.pathname,
    logout: state.authentication.logout,
  });

  const actionCreators = {
    ...routeActions,
    ...authentication,
    ...user,
  }
  
  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
