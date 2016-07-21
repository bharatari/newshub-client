import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import { routerActions } from 'react-router-redux';
import * as actions from './modules/actions';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  user: state.user.fetchCurrentUser.user,
  upcomingReservations: state.dashboard.upcomingReservations.reservations,
  requestingUpcoming: state.dashboard.upcomingReservations.requesting,
  currentReservations: state.dashboard.currentReservations.reservations,
  requestingCurrent: state.dashboard.currentReservations.requesting,
});

const actionCreators = {
  ...routerActions,
  ...actions,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
