import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as device from 'modules/device/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  user: state.user.fetchCurrentUser.user,
  device: state.device.createDevice.device,
  requesting: state.device.createDevice.requesting,
  error: state.device.createDevice.error,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...device,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
