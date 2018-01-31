import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const button = classNames(
  'ui button blue button-light',
  classes.marginTop
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
        <p className={classes.header}>Notes</p>
        <Field name="notes" component="textarea" className={classes.font} />
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
