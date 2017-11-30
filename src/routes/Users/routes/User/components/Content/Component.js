import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Master, Admin } from '../';
import userUtils from 'modules/user/utils';
import access from 'utils/access';

export default class Content extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
    actions: PropTypes.object,
  };
  render() {
    const { user: { title, notes, roles, disabled } } = this.props;
    const edit = access.has(this.props.roles, 'user:update');
    const editNotes = access.has(this.props.roles, 'user:notes:update');

    return (
      <div>
        <p className={classes.header}>Name</p>
        <p className={classes.content}>{this.props.user.fullName}</p>
        <p className={classes.header}>Username</p>
        <p className={classes.content}>{this.props.user.username}</p>
        <p className={classes.header}>Email</p>
        <p className={classes.content}>{this.props.user.email}</p>
        <p className={classes.header}>Created At</p>
        <p className={classes.content}><FormatDate date={this.props.user.createdAt} /></p>
        {
          edit ?
          <Master user={this.props.user} actions={this.props.actions} /> :
          <div>
            <p className={classes.header}>Title</p>
            <p className={classes.content}>{title ? title : 'None.'}</p>
            <p className={classes.header}>Notes</p>
            <p className={classes.content}>{notes ? notes : 'None.'}</p>
            <p className={classes.header}>Roles</p>
            <p className={classes.content}>{roles ? roles : 'None.'}</p>
            <p className={classes.header}>Disabled</p>
            <p className={classes.content}>{disabled ? 'True' : 'False'}</p>
          </div>
        }
        {
          !edit && editNotes ?
          <Admin user={this.props.user} actions={this.props.actions} /> :
          null
        }
      </div>
    );
  }
}
