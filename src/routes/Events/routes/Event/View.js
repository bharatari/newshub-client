import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, FormatDate, TextLoading, Response, Card } from 'components/';
import { Content, Scanner } from './components';

export default class EventView extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    requestingEvent: PropTypes.bool,
  };
  state = {
    updated: false,
  };
  componentDidMount() {
    this.props.actions.resetUpdateEvent();
    this.props.actions.fetchEvent(this.props.id);
  }
  handleClick = () => {
    this.props.actions.push('/app/room-event/new');
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedEvent && !nextProps.requestingUpdateEvent) {
      if (!this.state.updated) {
        this.props.actions.fetchEvent(this.props.id);

        this.setState({
          updated: true,
        });
      }
    }

    if (nextProps.requestingUpdateEvent) {
      this.setState({
        updated: false,
      });
    }
  }
  render() {
    const { event, requestingEvent, 
            actions, updateError, updatedEvent,
            requestingUpdateEvent, currentUrl, user,
            log, logs, requestingCreateLog, createLogError,
            sortField, sortType, sortBy, totalPages, page,
            requestingLogs, location } = this.props;

    return (
      <div>
        <SidebarPage currentUrl={currentUrl} actions={actions}
          header="Event" loading={requestingEvent || requestingUpdateEvent}
          user={this.props.user} roles={this.props.roles}>
          <Card column="sixteen">
            <div>
              <Response error={updateError} response={updatedEvent}
                successHeader="You successfully updated this event." />
              {
                event ? 
                <Content event={event} actions={actions} user={user} log={log} logs={logs}
                  requestingLogs={requestingLogs} sortField={sortField} sortType={sortType}
                  sortBy={sortBy} totalPages={totalPages} page={page} location={location}
                  requestingCreateLog={requestingCreateLog} createLogError={createLogError}/> :
                <TextLoading loading={requestingEvent} /> 
              }
            </div>
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
