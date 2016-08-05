import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content } from './components';

export default class UserView extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    device: PropTypes.object,
    requestingDevice: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.fetchDevice(this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedDevice && !nextProps.requestingUpdateDevice) {
      if (!this.state.updated) {
        this.props.actions.fetchDevice(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateDevice) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { user, device, requestingDevice, error, actions, currentUrl, updatedDevice, requestingUpdateDevice } = this.props;
    const successHeader = 'You successfully updated this device.';

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Device" loading={requestingDevice || requestingUpdateDevice} user={user}>
          <Card column="sixteen">
            <Response error={this.props.error} response={updatedDevice}
              successHeader={successHeader} />
            {
              device ?
              <Content device={this.props.device} actions={actions} /> :
              <TextLoading loading={requestingDevice} /> 
            }
            </Card>
        </SidebarPage>
      </div>
    );
  }
}
