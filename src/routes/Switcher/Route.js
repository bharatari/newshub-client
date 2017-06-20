import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import { routerActions } from 'react-router-redux';
import * as user from 'modules/user/actions';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  query: ownProps.location.query,
  user: state.user.fetchCurrentUser.user,
  requestingUpdateUser: state.user.updateUser.requesting,
  response: state.user.updateUser.user,
  error: state.user.updateUser.error,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
