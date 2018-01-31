import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card } from 'components/';
import { animateScroll as scroll } from 'react-scroll';

export default class NewProjectView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    requestedDevices: false,
  }
  componentDidMount() {
    this.props.actions.resetCreateProject();
    this.props.actions.resetFetchProjects();
    this.props.actions.fetchDevices(null, null, false);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newProject) {
      const { startDate, endDate } = nextProps.newProject.values;
      const { startDate: oldStartDate, endDate: oldEndDate } = this.props.newProject.values;

      if (startDate && endDate) {
        if ((startDate !== oldStartDate) || (endDate !== oldEndDate)) {
          this.props.actions.fetchDevices(startDate, endDate, false);
          this.props.actions.fetchProjects(startDate, endDate);
          this.setState({
            requestedDevices: false,
          });
        } else if (this.props.requestingDevices) {
          if (!this.state.requestedDevices) {
            this.props.actions.setWizardValue({
              name: 'newProject',
              key: 'selectedDevices',
              value: [],
            });

            this.setState({
              requestedDevices: true,
            });
          }
        }
      }  
    }
  }
  handleSubmit = (values) => {
    this.props.actions.createProject(values);
    scroll.scrollToTop();
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const button = classNames(
      'ui animated button blue button-light',
      { loading: this.props.requestingCreateProject }
    );
    const disable = this.props.requestingCreateProject || this.props.createdProject;
    const loading = this.props.requestingCreateProject || this.props.requestingDevices || this.props.requestingProjects;
    const right = <button className={button} disabled={disable}
                    onClick={this.handleClick}>
                    <div className="visible content">SAVE</div>
                    <div className="hidden content">
                      <i className="checkmark icon"></i>
                    </div>
                  </button>;
    const message = <div className="ui success message">
                      <div className="header">
                        Your reservation has been created.
                      </div>
                      <p>It will need to be approved by a member of management.</p>
                    </div>

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Project" right={right} loading={loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            { this.props.createdProject ? message : null }
            <Form ref="form" remainingDevices={this.props.remainingDevices}
              requestingCreateProject={this.props.requestingCreateProject}
              onSubmit={this.handleSubmit} selectedDevices={this.props.selectedDevices} />
            <Wizard actions={this.props.actions} selectedDevices={this.props.selectedDevices}
              remainingDevices={this.props.remainingDevices} reservations={this.props.reservations} />
            {right}
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
