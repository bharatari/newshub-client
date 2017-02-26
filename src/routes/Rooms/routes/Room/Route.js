import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as room from 'modules/room/actions';
import * as image from 'modules/image/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  user: state.user.fetchCurrentUser.user,
  room: state.room.fetchRoom.room,
  requestingRoom: state.room.fetchRoom.requesting,
  error: state.room.fetchRoom.error,
  updatedRoom: state.room.updateRoom.room,
  requestingUpdateRoom: state.room.updateRoom.requesting,
  updateError: state.room.updateRoom.error,
  updateRoom: state.room.updateRoom,
});

const actionCreators = {
  ...routerActions,
  ...room,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
