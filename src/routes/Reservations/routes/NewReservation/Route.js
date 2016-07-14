import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import * as device from 'modules/device/actions';
import * as wizard from 'modules/wizard/actions';
import { routeActions } from 'react-router-redux';
import { groupDevices } from 'modules/wizard/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  remainingDevices: groupDevices(state),
  requestingCreateReservation: state.reservation.createReservation.requesting,
  createdReservation: state.reservation.createReservation.reservation,
  selectedDevices: state.wizard.newReservation.selectedDevices,
  newReservation: state.form.newReservation,
  requestingDevices: state.device.fetchDevices.requesting,
});

const actionCreators = {
  ...routeActions,
  ...reservation,
  ...device,
  ...wizard,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
