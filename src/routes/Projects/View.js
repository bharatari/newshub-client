import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card, Status } from 'components/';
import reservation from 'modules/reservation/utils';

export default class ProjectsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Start Date', property: 'startDate' , type: 'date' },
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
    ],
  };
  componentDidMount() {
    this.props.actions.fetchProjects();
  }
  handleClick = () => {
    this.props.actions.push('/app/project/new');
  };
  render() {
    const right = <button className="ui animated button blue inverted button-light" onClick={this.handleClick}>
                    <div className="visible content">ADD</div>
                    <div className="hidden content">
                      <i className="add circle icon"></i>
                    </div>
                  </button>;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="Projects" right={right} loading={this.props.requestingProjects}
          user={this.props.user}>
          <Card column="sixteen">
            {
              this.props.projects ?
              <Table fields={this.state.fields}
                data={this.props.projects} 
                actions={this.props.actions}
                route="/app/project" />
              : <TextLoading loading={this.props.requestingProjects} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
