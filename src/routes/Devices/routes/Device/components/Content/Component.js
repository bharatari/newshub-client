import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { ImageUploader } from '../';
import Form from './Form';
import userUtils from 'modules/user/utils';
import access from 'utils/access';

export default class Content extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.updateDevice(this.props.device.id, values);
  };
  render() {
    let imageBackground;

    if (this.props.thumbnail) {
      imageBackground = {
        backgroundImage: 'url(' + this.props.thumbnail.url + ')',
      };
    }

    const edit = access.has(this.props.roles, 'device:update');

    return (
      <div>
        {
          !edit && this.props.device ?
          <div>
            <p className={classes.header}>Name</p>
            <p className={classes.content}>{this.props.device.name}</p>
            <p className={classes.header}>Label</p>
            <p className={classes.content}>{this.props.device.label}</p>
            <p className={classes.header}>Description</p>
            <p className={classes.content}>{this.props.device.description}</p>
            <p className={classes.header}>Type</p>
            <p className={classes.content}>{this.props.device.type}</p>
            <p className={classes.header}>Barcode</p>
            <p className={classes.content}>{this.props.device.barcode}</p>
            <p className={classes.header}>Quantity</p>
            <p className={classes.content}>{this.props.device.quantity}</p>
            { this.props.thumbnail ? <div className={classes.imageBox} style={imageBackground}></div> : null }
            
          </div>
          : null
        }
        <p className={classes.header}>Created At</p>
        <p className={classes.content}><FormatDate date={this.props.device.createdAt} /></p>
        {
          edit ?
          <div>
            <Form onSubmit={this.handleSubmit} />
            <p className={classes.header}>IMAGE</p>
            <ImageUploader device={this.props.device} createImage={this.props.createImage}
              deleteImage={this.props.deleteImage} updateDevice={this.props.updateDevice}
              actions={this.props.actions} form={this.props.form} />
          </div> : null
        }
      </div>
    );
  }
}
