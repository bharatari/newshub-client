import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { ImageUploader } from '../';
import Form from './Form';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import { Row, Col } from 'antd'; 

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
        <Row>
          <Col span={8}>
            <div className={classes.imageBox} style={imageBackground}></div> 
          </Col>
          
          <Col span={8}>
            <h2>{this.props.device.name}</h2>
            <p>{this.props.device.label}</p>
            <p>{this.props.device.description}</p>
          </Col>
          
          <Col span={8}>
            <p>Available</p>
            <p>{this.props.quantity}</p>
          </Col>
        </Row>
        
        <Row>
          <Col span={8}>
            <p>{this.props.device.type}</p>
            <p>{this.props.device.barcode}</p>
          </Col>

          <Col span={8}>
            <p><FormatDate date={this.props.device.createdAt} /></p>
          </Col>
        </Row>
      
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
