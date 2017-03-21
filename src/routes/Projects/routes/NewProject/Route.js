import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import * as device from 'modules/device/actions';
import * as wizard from 'modules/wizard/actions';
import { routerActions } from 'react-router-redux';
import { groupDevices } from 'modules/wizard/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  roles: state.role.fetchRoles.roles,
  remainingDevices: groupDevices(state),
  requestingCreateProject: state.reservation.createProject.requesting,
  createdProject: state.reservation.createProject.reservation,
  selectedDevices: state.wizard.newProject.selectedDevices,
  newProject: state.form.newProject,
  requestingDevices: state.device.fetchDevices.requesting,
  reservations: state.reservation.fetchProjects.reservations,
  requestingProjects: state.reservation.fetchProjects.requesting,
  user: state.user.fetchCurrentUser.user,
});

const actionCreators = {
  ...routerActions,
  ...reservation,
  ...device,
  ...wizard,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
