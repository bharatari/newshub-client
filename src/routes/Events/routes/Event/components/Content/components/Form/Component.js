import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'antd';
import { Input, DateTime, AutoComplete } from 'components/';

class LogForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="user" data={this.props.users} onSearch={this.props.onSearch} component={AutoComplete} />
        <Field name="type" type="text" component={Input} />
        <Field name="createdAt" component={DateTime} />
      </Form>
    );
  }
}

export default reduxForm({
  form: 'log',
})(LogForm);
