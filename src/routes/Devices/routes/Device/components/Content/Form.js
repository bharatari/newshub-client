import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const button = classNames(
  'ui button inverted blue button-light',
  classes.button
);

const renderField = props => (
  <div className="field">
    <div className="ui checkbox">
      <input className={classes.font} type="checkbox" tabIndex="0" className="hidden" {...props.input} />
      <label>Disable Device</label>
    </div>
  </div>
);

class DeviceForm extends React.Component {
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
        <p className={classes.header}>Name</p>
        <Field name="name" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Label</p>
        <Field name="label" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Description</p>
        <Field name="description" component="textarea" className={classes.font} />
        <p className={classes.header}>Notes</p>
        <Field name="notes" component="textarea" className={classes.font} />
        <p className={classes.header}>Type</p>
        <Field name="type" component="input" type="text" className={classes.font} />
        <p className={classes.header}>Quantity</p>
        <Field name="quantity" component="input" type="number" className={classes.font} />
        <p className={classes.header}>Disabled</p>
        <Field name="disabled" component={renderField} type="checkbox" className={classes.font} />
        <button className={button} type="submit">UPDATE</button>
      </form>
    );
  }
}

DeviceForm = reduxForm({
  form: 'device',
})(DeviceForm);

DeviceForm = connect(
  state => ({
    initialValues: state.device.fetchDevice.device,
  }),
)(DeviceForm);

export default DeviceForm;
