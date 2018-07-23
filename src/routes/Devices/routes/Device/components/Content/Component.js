import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate, Response } from 'components/';
import Form from './Form';
import userUtils from 'modules/user/utils';
import access from 'utils/access';
import { Row, Col, Modal } from 'antd'; 

export default class Content extends React.Component {
  static propTypes = {
    device: PropTypes.object,
    actions: PropTypes.object,
  };
  handleSubmit = (values) => {
    this.props.actions.updateDevice(this.props.device.id, values);
  };
  handleOk = () => {
    this.refs.form.getWrappedInstance().submit();

    this.props.hideEditModal();
  };
  handleCancel = () => {
    this.props.hideEditModal();
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.updateDevice.requesting && !nextProps.updateDevice.requesting) {
      if (this.props.updateDevice.device) {
        this.props.hideEditModal();
      }
    }
  }
  render() {
    const { updateDevice } = this.props;
    let imageBackground;

    if (this.props.device.image) {
      imageBackground = {
        backgroundImage: 'url(' + this.props.device.image + ')',
      };
    }    

    return (
      <div>
         <Modal title="Edit Device" visible={this.props.showEditModal} okText="Update" cancelText="Cancel" onOk={this.handleOk} onCancel={this.handleCancel}>
          <Response response={updateDevice.log} error={updateDevice.error} successText="Successfully updated" />
          <Form ref="form" onSubmit={this.handleSubmit} />
        </Modal>

        <Row>          
          <Col span={12} className={classes.mainColumn}>
            <div className={classes.imageBox} style={imageBackground}></div>
            <div className={classes.mainDetails}>
              <h2 className={classes.deviceLabel}>{this.props.device.label}</h2>
              <p className={classes.deviceName}>{this.props.device.label}</p>
              <p className={classes.description}>{this.props.device.description}</p>
            </div>
          </Col>
          
          <Col span={12}>
            <p className={classes.available}>Available</p>
            <p>{this.props.quantity}</p>
          </Col>

          <p className={classes.category}>{this.props.device.type}</p>
        </Row>
        
        <Row>
          <Col span={8}>
            <p>{this.props.device.barcode}</p>
          </Col>

          <Col span={8}>
            <p><FormatDate date={this.props.device.createdAt} /></p>
          </Col>
        </Row>       
      </div>
    );
  }
}
