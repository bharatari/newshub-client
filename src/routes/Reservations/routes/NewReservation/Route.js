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
  remainingDevices: groupDevices(state),
  requestingCreateReservation: state.reservation.createReservation.requesting,
  createdReservation: state.reservation.createReservation.reservation,
  selectedDevices: state.wizard.newReservation.selectedDevices,
  newReservation: state.form.newReservation,
  requestingDevices: state.device.fetchDevices.requesting,
  reservations: state.reservation.fetchReservations.reservations,
  requestingReservations: state.reservation.fetchReservations.requesting,
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
