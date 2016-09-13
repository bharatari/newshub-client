import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as device from 'modules/device/actions';
import * as image from 'modules/image/actions';
import { routerActions } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => ({
  currentUrl: ownProps.location.pathname,
  id: ownProps.params.id,
  user: state.user.fetchCurrentUser.user,
  device: state.device.fetchDevice.device,
  requestingDevice: state.device.fetchDevice.requesting,
  error: state.device.fetchDevice.error,
  updatedDevice: state.device.updateDevice.device,
  requestingUpdateDevice: state.device.updateDevice.requesting,
  updateError: state.device.updateDevice.error,
  updateDevice: state.device.updateDevice,
  createImage: state.image.createImage,
  deleteImage: state.image.deleteImage,
  form: state.form.fileUploader,
});

const actionCreators = {
  ...routerActions,
  ...device,
  ...image,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
