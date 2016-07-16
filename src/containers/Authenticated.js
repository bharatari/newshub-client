import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import * as user from 'modules/user/actions';
import { loginRedirect } from 'constants/keys';
import { routeActions } from 'react-router-redux';

export default function authenticated(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      actions: PropTypes.shape({
        fetchUser: PropTypes.func,
        replace: PropTypes.func,
      }).isRequired,
      requestingUser: PropTypes.bool.isRequired,
      user: PropTypes.object,
    };
    componentWillMount() {
      this.props.actions.fetchUser();
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requestingUser && !nextProps.user) {
        if (nextProps.currentRoute !== loginRedirect) {
          this.props.actions.replace(loginRedirect + '?next=' + nextProps.currentRoute);
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
            this.props.user
            ? <Component user={this.props.user} {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    requestingUser: state.user.fetchUser.requesting,
    user: state.user.fetchUser.user,
    currentRoute: state.router.location.pathname,
    logout: state.authentication.logout,
  });

  const actionCreators = {
    ...routeActions,
    ...authentication,
    ...user,
  };

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
