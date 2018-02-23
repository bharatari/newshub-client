import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import { DateTime } from 'components/';

const renderDate = ({ input, meta: { touched, error }}) => (
  <div>
    <DateTime {...input} />
    {touched && error && <span className={classes.errorText}>{error}</span>}
  </div>
);

class DateSelection extends React.Component {
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
        <div className="fields">
          <div className="eight wide field">
            <label className={classes.font}>Start Date</label>
            <Field name="startDate" placeholder="Start Date" component={renderDate} />
          </div>
          <div className="eight wide field">
            <label className={classes.font}>End Date</label>
            <Field name="endDate" placeholder="End Date" component={renderDate} />
          </div>
        </div>
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
})(DateSelection);
