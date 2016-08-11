import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';

class FileUploaderForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    requestingCreateImage: PropTypes.bool.isRequired,
  };
  render() {
    const { handleSubmit, requestingCreateImage } = this.props;
    const submit = classNames(
      'ui inverted red button button-light',
      classes.submit,
      { loading: requestingCreateImage }
    );

    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <Field type="file" name="file" component="input" />
        </div>

        <button type="submit" disabled={requestingCreateImage} className={submit}>Upload</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'fileUploader',
})(FileUploaderForm);
