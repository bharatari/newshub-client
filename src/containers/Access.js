import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { defaultRedirect } from 'constants/keys';
import { routerActions } from 'react-router-redux';
import authenticated from './Authenticated';
import { Unauthorized } from 'components/';
import * as role from 'modules/role/actions';
import access from 'utils/access';

export default authenticated(access(Component));

function access(Component) {
  class AccessComponent extends React.Component {
    state = {
      authorized: false,
    };
    componentWillMount() {
      if (!this.props.roles) {
        this.props.actions.fetchRoles();
      }
    }
    componentWillReceiveProps(nextProps) {
      if (!nextProps.requesting && this.props.roles) {
        const role = access.getRole(this.props.url);
        
        this.setState({ authorized: access.has(this.props.roles, role) });
      }
    }
    render() {
      return (
        ( (!this.props.requesting || this.props.roles) && this.state.authorized ) ?
        <Component user={this.props.user} />:
        <Unauthorized />
      );
    }
  }
  
  const mapStateToProps = (state, ownProps) => ({
    url: ownProps.location.pathname,
    requestingRole: state.role.fetchRoles.requesting,
    roles: state.role.fetchRoles.roles,
  });

  const actionCreators = {
    ...routerActions,
    ...role,
  }

  const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(MasterComponent);
}
