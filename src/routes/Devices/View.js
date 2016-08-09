import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card } from 'components/';
import reservation from 'modules/reservation/utils';

export default class DevicesView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    fields: [
      { label: 'Name', property: 'name' },
      { label: 'Label', property: 'label' },
      { label: 'Type', property: 'type' },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    this.props.actions.fetchDevices();
  }
  handleClick = () => {
    this.props.actions.push('/app/device/new');
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
          header="Devices" right={right} loading={this.props.requestingDevices} user={this.props.user}>
          <Card column="sixteen">
            {
              this.props.devices ?
              <Table fields={this.state.fields}
                data={this.props.devices} 
                actions={this.props.actions}
                route="/app/device" />
              : <TextLoading loading={this.props.requestingDevices} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
