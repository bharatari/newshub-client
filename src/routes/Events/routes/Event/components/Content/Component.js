import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate, PaginatedTable, Response } from 'components/';
import { Button, Modal } from 'antd';
import eventUtils from 'modules/event/utils';
import user from 'modules/user/utils';
import _ from 'lodash';
import { Scanner } from '../';
import { Type, Form } from './components';

export default class Content extends React.Component {
  static propTypes = {
    event: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'targetUser.fullName' },
      { label: 'Type', property: 'type', component: Type },
      { label: 'Date', property: 'date', type: 'datetime' },
    ],
    visible: false,
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.manualLog.requesting && !nextProps.manualLog.requesting && nextProps.manualLog.log) {
      this.props.actions.fetchLogs({
        eventId: nextProps.event.id,
      });
    }
  }
  handleClick = () => {
    this.setState({
      visible: true,
    });
  };
  handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This action is irreversible.',
      onOk() {
        self.props.delete(self.props.id);
      },
    });
  };
  handleOk = () => {
    this.refs.form.submit();
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });

    this.props.localActions.resetCreateLog();
    this.props.actions.destroy('log');
  };
  handleManualLog = (values) => {
    this.props.localActions.createLog({
      barcode: values.barcode,
      eventId: this.props.event.id,
      date: values.date,
      type: values.type,
    });
  };
  handleUserSearchSubmit = (value) => {
    this.props.localActions.searchUsers({
      search: value,
    });
  };
  render() {
    const { event, log, requestingCreateLog, manualLog, createLogError, actions, event: { notes } } = this.props;
    const isOpen = eventUtils.isOpen(event);

    return (
      <div className={classes.contentContainer}>
        <Modal title="Manual Log" visible={this.state.visible} okText="Create" cancelText="Cancel" onOk={this.handleOk} onCancel={this.handleCancel}>
          <Response response={manualLog.log} error={manualLog.error} successText="Successfully logged" />
          <Form ref="form" onSearch={this.handleUserSearchSubmit} onSubmit={this.handleManualLog} users={this.props.searchUsers}
            uniqueKey="barcode" labelKey="fullName" />
        </Modal>

        <Response error={createLogError} />
        <h2 className={classes.dateHeader}>{this.props.event.name}</h2>
        <span className={classes.subheader}><p className={classes.userHeader}>by {this.props.event.user.fullName}</p></span>
        <p className={classes.statusText} style={{ backgroundColor: 'black' }}>{isOpen ? 'Open' : 'Closed'}</p>

        <Scanner disabled={!isOpen} actions={actions} log={log} requestingCreateLog={requestingCreateLog}
          createLogError={createLogError} event={event} />
        
        <div className="ui grid">
          <div className="eight wide column">
            <p className={classes.activityHeader}>DETAILS</p>
            <p className={classes.header}>Start Date</p>
            <p className={classes.content}><FormatDate datetime={this.props.event.startDate} /></p>   

            <p className={classes.header}>End Date</p>
            <p className={classes.content}><FormatDate datetime={this.props.event.endDate} /></p>

            <p className={classes.header}>Notes</p>
            <p className={classes.content}>{notes ? notes : 'None.'}</p> 
          </div>
          <div className="eight wide column">
            <p className={classes.activityHeader}>Actions</p>

            <Button.Group className={classes.actionsBox}>
              <Button type="primary" onClick={this.handleClick} ghost>Manual Log</Button>
              <Button type="danger" onClick={this.handleDelete} ghost>Delete</Button>
            </Button.Group>

            <h2 className={classes.activityHeader}>Activity</h2>
            <div className={classes.activityBox}>
              <ul>
                <li>
                  <strong>{this.props.event.user.fullName}</strong> created this on <FormatDate datetime={this.props.event.createdAt} />
                </li>
              </ul>
            </div>
          </div>
          <div className="sixteen wide column">
            <h2 className={classes.activityHeader}>Logs</h2>
            <PaginatedTable data={this.props.logs} loading={this.props.requestingLogs}
              fields={this.state.fields} route="#" totalPages={this.props.totalPages}
              fetch={this.props.actions.fetchLogs} actions={this.props.actions}
              filter={{ eventId: this.props.event.id }} location={location} />
          </div>
        </div>
      </div>
    );
  }
}
