import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import * as device from 'modules/device/actions';
import { routeActions } from 'react-router-redux';
import { getRemainingDevices } from 'modules/wizard/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  remainingDevices: getRemainingDevices(state),
  requestingCreateReservation: state.reservation.createReservation.requesting,
});

const actionCreators = {
  ...routeActions,
  ...reservation,
  ...device,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
