import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import reservation from 'modules/reservation/utils';
import user from 'modules/user/utils';
import _ from 'lodash';

export default class Content extends React.Component {
  static propTypes = {
    reservation: PropTypes.object,
  };
  render() {
    const { reservation: { notes, specialRequests, adminNotes } } = this.props;
    const reviewedBy = _.get(this.props.reservation, 'approvedBy.fullName') || _.get(this.props.reservation, 'rejectedBy.fullName');
    const checkedOutBy = _.get(this.props.reservation, 'checkedOutBy.fullName');
    const checkedInBy = _.get(this.props.reservation, 'checkedInBy.fullName');

    return (
      <div>
        <p className={classes.header}>Name</p>
        <p className={classes.content}>{this.props.reservation.user.fullName}</p>
        <p className={classes.header}>Purpose</p>
        <p className={classes.content}>{this.props.reservation.purpose}</p>
        <p className={classes.header}>Notes</p>
        <p className={classes.content}>{notes ? notes : 'None.'}</p>
        <p className={classes.header}>Special Requests</p>
        <p className={classes.content}>{specialRequests ? specialRequests : 'None.'}</p>
        <p className={classes.header}>Admin Notes</p>
        <p className={classes.content} style={{ color: '#d05454' }}>{adminNotes ? adminNotes : 'None.'}</p>
        <p className={classes.header}>Start Date</p>
        <p className={classes.content}><FormatDate datetime={this.props.reservation.startDate} /></p>
        <p className={classes.header}>End Date</p>
        <p className={classes.content}><FormatDate datetime={this.props.reservation.endDate} /></p>
        <p className={classes.header}>Created At</p>
        <p className={classes.content}><FormatDate datetime={this.props.reservation.createdAt} /></p>
        <p className={classes.header}>Devices</p>
        <Devices devices={this.props.reservation.devices} />
        <p className={classes.header}>Status</p>
        <p className={classes.content}>{reservation.getReservationStatus(this.props.reservation)}</p>
        <p className={classes.header}>Reviewed By</p>
        <p className={classes.content}>{reviewedBy ? reviewedBy : 'N/A'}</p>
        <p className={classes.header}>Checked Out By</p>
        <p className={classes.content}>{checkedOutBy ? checkedOutBy : 'N/A'}</p>
        <p className={classes.header}>Checked In By</p>
        <p className={classes.content}>{checkedInBy ? checkedInBy : 'N/A'}</p>
      </div>
    );
  }
}
