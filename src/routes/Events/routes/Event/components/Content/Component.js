import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import event from 'modules/event/utils';
import user from 'modules/user/utils';
import _ from 'lodash';
import { Scanner } from '../';

export default class Content extends React.Component {
  static propTypes = {
    event: PropTypes.object,
  };
  render() {
    const { event, log, requestingCreateLog, createLogError, actions, event: { notes } } = this.props;

    return (
      <div className={classes.contentContainer}>
        <h2 className={classes.dateHeader}>{this.props.event.name}</h2>
        <span className={classes.subheader}><p className={classes.userHeader}>by {this.props.event.user.fullName}</p></span>
        <p className={classes.statusText} style={{ backgroundColor: 'black' }}>{event.closed ? 'Closed' : 'Open'}</p>

        <Scanner actions={actions} log={log} requestingCreateLog={requestingCreateLog}
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
            <h2 className={classes.activityHeader}>Activity</h2>
            <div className={classes.activityBox}>
              <ul>
                <li>
                  <strong>{this.props.event.user.fullName}</strong> created this on <FormatDate datetime={this.props.event.createdAt} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
