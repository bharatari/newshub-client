import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as project from 'modules/project/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  projects: state.reservation.fetchProjects.projects,
  requestingProjects: state.reservation.fetchProjects.requesting,
  user: state.user.fetchCurrentUser.user,
  roles: state.role.fetchRoles.roles,
});

const actionCreators = {
  ...routerActions,
  ...project,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
