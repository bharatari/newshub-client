import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import Dummy from './Dummy';

const renderField = ({ input, meta: { touched, error }}) => (
  <div>
    <div className="ui input">
      <input {...input} className={classes.font} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

const renderDate = ({ input, meta: { touched, error }}) => (
  <div>
    <div className="ui input">
      <input type="datetime-local" {...input} className={classes.font} />
    </div>
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class NewReservationForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    remainingDevices: PropTypes.object,
    selectedDevices: PropTypes.array,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting, remainingDevices, selectedDevices } = this.props;
    const renderWizard = props => (
      <span>
        <h2 className={classes.deviceHeader}>Devices</h2>
        <Dummy onChange={props.input.onChange} value={props.input.value}
          remainingDevices={remainingDevices} selectedDevices={selectedDevices} />
        {props.touched && props.error && <span className={classes.errorText}>{props.error}</span>}
      </span>
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <div className="field">
          <label className={classes.font}>Start Date</label>
          <Field name="startDate" placeholder="Start Date" component={renderDate} />
        </div>
        <div className="field">
          <label className={classes.font}>End Date</label>
          <Field name="endDate" placeholder="End Date" component={renderDate} />
        </div>
        <div className="field">
          <label className={classes.font}>Purpose</label>
          <Field name="purpose" type="text" component={renderField} />
        </div>
        <div className="field">
          <label className={classes.font}>Special Requests</label>
          <Field name="specialRequests" type="text" placeholder="Requests that require special approval" component={renderField} />
        </div>
        <div className="field">
          <label className={classes.font}>Additional Notes</label>
          <Field name="notes" type="text" component={renderField} />
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
