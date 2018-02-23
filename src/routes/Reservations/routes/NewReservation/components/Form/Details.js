import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';

const renderField = ({ input, meta: { touched, error }}) => (
  <div>
    <div className="ui input">
      <input {...input} className={classes.font} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class Details extends React.Component {
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
        <div className="field">
          <label className={classes.font}>Purpose</label>
          <Field name="purpose" type="text" component={renderField} />
        </div>
        <div className="field">
          <label className={classes.font}>Additional Details</label>
          <Field name="notes" type="text" component={renderField} />
        </div>
        <button className="ui button" onClick={this.props.previous}>Previous</button>
        <button className="ui button" type="submit">Next</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Details);
