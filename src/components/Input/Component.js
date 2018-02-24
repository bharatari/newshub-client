import React from 'react';
import { Form, Input } from 'antd';
import { DateTime } from 'components/';

export default ({ input, meta: { touched, error }, label, ...props }) => {
  const showError = touched && error;
  const status = showError ? 'error' : 'success';
  const help = showError ? error : null;

  if (props.type === 'datetime') {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <DateTime {...input} {...props} />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item validateStatus={status} help={help} label={label}>
        <Input {...input} {...props} />
      </Form.Item>
    );
  }  
};
