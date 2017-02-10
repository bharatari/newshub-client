import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';

export default class ProjectView extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    requestingProject: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateProject();
    this.props.actions.fetchProject(this.props.id);
  }
  handleClick = () => {
    this.props.actions.push('/app/project/new');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedProject && !nextProps.requestingUpdateProject) {
      if (!this.state.updated) {
        this.props.actions.fetchProject(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateProject) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { project, requestingProject, 
            actions, updateError, updatedProject,
            requestingUpdateProject, currentUrl, user } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Project" loading={requestingProject || requestingUpdateProject}
          user={this.props.user}>
          <Card column="sixteen">
            <div>
              <Response error={updateError} response={updatedProject}
                successHeader="You successfully updated this project." />
              {
                project ? 
                <Content project={project} actions={actions} user={user} /> :
                <TextLoading loading={requestingProject} /> 
              }
            </div>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
