import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import reservation from 'modules/reservation/utils';
import { Dummy, Wizard } from '../';

class DeviceSelection extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    remainingDevices: PropTypes.object,
    selectedDevices: PropTypes.array,
  };
  componentDidMount() {
    this.props.localActions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: [],
    });

    this.props.actions.fetchDevices(startDate, endDate, false, true);
    this.props.actions.fetchReservations({
      startDate,
      endDate,
      page: 1,
      disabled: false,
    });
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, remainingDevices, selectedDevices } = this.props;
    const renderWizard = props => (
      <span>
        <Dummy onChange={props.input.onChange} value={props.input.value}
          remainingDevices={remainingDevices} selectedDevices={selectedDevices} />
        {props.touched && props.error && <span className={classes.errorText}>{props.error}</span>}
      </span>
    );

    return (
      <form onSubmit={handleSubmit} className="ui form">
        <h4 className="ui dividing header">Devices</h4>
        <Field name="devices" component={renderWizard} />
        <Wizard {...this.props.wizard} />
        <button className="ui button" onClick={this.props.previous}>Previous</button>
        <button className="ui button" type="submit">Save</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newReservation',
  validate: reservation.validateNewReservation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(DeviceSelection);
