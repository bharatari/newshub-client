import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as event from 'modules/event/actions';
import * as log from 'modules/log/actions';
import { routerActions } from 'react-router-redux';
import { pageSelector } from 'modules/log/selectors';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  event: state.event.fetchEvent.event,
  requestingEvent: state.event.fetchEvent.requesting,
  updatedEvent: state.event.updateEvent.event,
  requestingUpdateEvent: state.event.updateEvent.requesting,
  updateError: state.event.updateEvent.error,
  log: state.log.createLog.log,
  requestingCreateLog: state.log.createLog.requesting,
  createLogError: state.log.createLog.error,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
  logs: state.log.fetchLogs.logs,
  requestingLogs: state.log.fetchLogs.requesting,
  totalPages: state.log.fetchLogs.totalPages,
  sortField: ownProps.location.query.sortField,
  sortType: ownProps.location.query.sortType,
  page: pageSelector(ownProps),
});

const actionCreators = {
  ...routerActions,
  ...event,
  ...log,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
