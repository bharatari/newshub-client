import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as user from 'modules/user/actions';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (state) => ({
  requestingCreateUser: state.user.createUser.requesting,
  error: state.user.createUser.error,
  user: state.user.createUser.user,
});

const actionCreators = {
  ...routeActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
