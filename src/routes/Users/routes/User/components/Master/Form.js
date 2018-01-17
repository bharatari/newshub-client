import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const button = classNames(
  'ui button inverted blue button-light',
  classes.marginTop
);

const checkbox = classNames(
  'hidden',
  classes.font
);

class UserForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <p className={classes.header}>Title</p>
        <Field name="organization_users.title" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Notes</p>
        <Field name="notes" component="textarea" className={classes.font} />
        <p className={classes.header}>Roles</p>
        <Field name="organization_users.roles" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Disabled</p>
        <div className="field">
          <div className="ui checkbox">
            <Field name="disabled" component="input" type="checkbox" className={classes.font} />
            <label>Disable User</label>
          </div>
        </div>
        <div className="field">
          <div className="ui checkbox">
            <Field name="options.doNotDisturb" component="input" type="checkbox" className={classes.font} />
            <label>Do Not Disturb</label>
          </div>
        </div>
        <button className={button} type="submit">UPDATE</button>
      </form>
    );
  }
}

UserForm = reduxForm({
  form: 'user',
})(UserForm);

UserForm = connect(
  state => ({
    initialValues: state.user.fetchUser.user,
  }),
)(UserForm);

export default UserForm;
