import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const button = classNames(
  'ui button inverted blue button-light',
  classes.marginTop
);

const renderField = ({ input, meta: { touched, error }}) => (
  <div className="field">
    <div className="ui checkbox">
      <input className={classes.font} type="checkbox" tabIndex="0" className="hidden" {...input} />
      <label>Disable User</label>
    </div>
  </div>
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
        <Field name="title" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Notes</p>
        <Field name="notes" component="textarea" className={classes.font} />
        <p className={classes.header}>Roles</p>
        <Field name="roles" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Disabled</p>
        <Field name="disabled" component={renderField} type="checkbox" className={classes.font} />
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
