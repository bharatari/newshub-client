import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authentication from 'modules/authentication/actions';
import * as user from 'modules/user/actions';
import { routerActions } from 'react-router-redux';

export default function session(Component) {
  class SessionComponent extends React.Component {
    componentWillMount() {
      this.props.actions.fetchCurrentUser();
    }
    render() {
      return <Component user={this.props.user}
               {...this.props} />;
    }
  }
  
  const mapStateToProps = (state) => ({
    requestingUser: state.user.fetchCurrentUser.requesting,
    user: state.user.fetchCurrentUser.user,
  });

  const actionCreators = {
    ...routerActions,
    ...authentication,
    ...user,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(SessionComponent);
}
