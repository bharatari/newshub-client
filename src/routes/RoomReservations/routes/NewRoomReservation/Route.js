import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as reservation from 'modules/reservation/actions';
import * as room from 'modules/room/actions';
import { routerActions } from 'react-router-redux';
import { processRooms } from 'modules/room/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  requestingCreateReservation: state.roomReservation.creatRoomReservation.reservation,
  rooms: processRooms(state),
  requestingRooms: state.room.fetchRooms.requesting,
  newRoomReservation: state.form.newRoomReservation,
  user: state.user.fetchCurrentUser.user,
});

const actionCreators = {
  ...routerActions,
  ...reservation,
  ...room,
};

const localActionCreators = {};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
  localActions: bindActionCreators(localActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
