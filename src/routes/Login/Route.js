import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as authentication from 'modules/authentication/actions';
import { routeActions } from 'react-router-redux';

const mapStateToProps = (state) => ({
  requestingLogin: state.authentication.requestingLogin,
  error: state.authentication.error,
  authenticated: state.authentication.authenticated,
});

const actionCreators = {
  ...routeActions,
  ...authentication,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
