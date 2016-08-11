import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { ImageUploader } from '../';
import Form from './Form';
import userUtils from 'modules/user/utils';

export default class Content extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.updateDevice(this.props.device.id, values);
  };
  render() {
    return (
      <div>
        <p className={classes.header}>Created At</p>
        <p className={classes.content}><FormatDate date={this.props.device.createdAt} /></p>
        <Form onSubmit={this.handleSubmit} />
        <p className={classes.header}>IMAGE</p>
        <ImageUploader device={this.props.device} createImage={this.props.createImage}
          deleteImage={this.props.deleteImage} updateDevice={this.props.updateDevice}
          actions={this.props.actions} form={this.props.form} />
      </div>
    );
  }
}
