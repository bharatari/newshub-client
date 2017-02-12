import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  reservations: state.reservation.fetchReservations.reservations,
  requestingReservations: state.reservation.fetchReservations.requesting,
  user: state.user.fetchCurrentUser.user,
  totalPages: state.reservation.fetchReservations.totalPages,
  currentPage: state.reservation.fetchReservations.currentPage,
  sortField: state.reservation.fetchReservations.sortField,
  sortType: state.reservation.fetchReservations.sortType,
});

const actionCreators = {
  ...routerActions,
  ...reservation,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
