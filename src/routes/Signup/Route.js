import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as user from 'modules/user/actions';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (state) => ({
  requestingCreateUser: state.user.requestingCreateUser,
  error: state.user.error,
  user: state.user.user,
});

const actionCreators = {
  ...routeActions,
  ...user,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
