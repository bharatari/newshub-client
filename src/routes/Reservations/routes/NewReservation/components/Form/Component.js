import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import Wizard from './Wizard';

const renderField = props => (
  <div className="ui input">
    <input {...props.input} />
    {props.touched && props.error && <span className={classes.errorText}>{props.error}</span>}
  </div>
);

class NewReservationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    remainingDevices: PropTypes.object,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, remainingDevices } = this.props;
    const renderWizard = props => (
      <span>
        <Wizard onChange={props.input.onChange} value={props.input.value}
          remainingDevices={remainingDevices} />
        {props.touched && props.error && <span className={classes.errorText}>{props.error}</span>}
      </span>
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <Field name="startDate" type="date" placeholder="Start Date" component={renderField} />
        </div>
        <div className="field">
          <Field name="endDate" type="date" placeholder="End Date" component={renderField} />
        </div>
        <div className="field">
          <Field name="purpose" type="text" placeholder="Purpose" component={renderField} />
        </div>
        <div className="field">
          <Field name="notes" type="text" placeholder="Additional Notes" component={renderField} />
        </div>
        <Field name="devices" component={renderWizard} />
      </form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
})(NewReservationForm);
