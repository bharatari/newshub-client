import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as device from 'modules/device/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  devices: state.device.fetchDevices.devices,
  requestingDevices: state.device.fetchDevices.requesting,
  user: state.user.fetchCurrentUser.user,
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
