import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card } from 'components/';
import { Disabled } from './components';
import reservation from 'modules/reservation/utils';

export default class UsersView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    fields: [
      { label: 'Name', property: 'fullName', component: Disabled },
      { label: 'Username', property: 'username' },
      { label: 'Email', property: 'email' },
      { label: 'Title', property: 'title' },
      { label: 'Admin', property: 'roles' },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    this.props.actions.fetchUsers();
  }
  handleClick = () => {
    this.props.actions.push('/app/user/new');
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
          header="Users" right={right} loading={this.props.requestingUsers} user={this.props.currentUser}
          roles={this.props.roles}>
          <Card column="sixteen">
            {
              this.props.users ?
              <Table fields={this.state.fields}
                data={this.props.users} 
                actions={this.props.actions}
                route="/app/user" />
              : <TextLoading loading={this.props.requestingUsers} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
