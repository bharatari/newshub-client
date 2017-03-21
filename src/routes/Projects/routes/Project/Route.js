import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as project from 'modules/project/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  roles: state.role.fetchRoles.roles,
  id: ownProps.params.id,
  project: state.project.fetchProject.project,
  requestingProject: state.project.fetchProject.requesting,
  updatedProject: state.project.updateProject.project,
  requestingUpdateProject: state.project.updateProject.requesting,
  updateError: state.project.updateProject.error,
  user: state.user.fetchCurrentUser.user,
});

const actionCreators = {
  ...routerActions,
  ...project,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
