import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import { defaultRedirect } from 'constants/keys';
import { routeActions } from 'react-router-redux';

export default function unauthenticated(Component) {
  class UnauthenticatedComponent extends React.Component {
    componentWillMount() {
      this.props.actions.fetchAuthenticated();
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requestingAuthenticated && nextProps.authenticated) {
        this.props.actions.replace(defaultRedirect);
      }
    }
    render() {
      return <Component {...this.props} />;
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingAuthenticated: state.authentication.requestingAuthenticated,
    authenticated: state.authentication.authenticated,
  });

  const actionCreators = {
    ...routeActions,
    ...authentication,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(UnauthenticatedComponent);
}
