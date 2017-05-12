import React, { PropTypes } from 'react';
import { Repeater } from 'components/';
import Image from './Image';
import Form from './Form';
import classes from './Styles.scss';

export default class ImageUploader extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      createImage: PropTypes.func,
      updateDevice: PropTypes.func,
    }),
    createImage: PropTypes.shape({
      requesting: PropTypes.bool,
    }),
    deleteImage: PropTypes.shape({
      requesting: PropTypes.bool,
    }),
    updateDevice: PropTypes.shape({
      requesting: PropTypes.bool,
      error: PropTypes.any,
    }),
    device: PropTypes.object,
    form: PropTypes.object,
  };
  state = {
    processedImage: false,
    processedDeleteImage: false,
    processedUpdateDevice: false,
  };
  componentDidMount() {
    this.props.actions.handleRemoveImage = this.handleRemoveImage;
  }
  componentWillReceiveProps(nextProps) {
    this.processCreateImage(nextProps);
    this.processDeleteImage(nextProps);
  }
  handleSubmit = () => {
    const file = this.props.form.values.file[0];
    let body = new FormData();
    body.append('file', file);

    this.props.actions.createImage(body);
  };
  handleRemoveImage = (id) => {
    this.props.actions.deleteImage(id);
  };
  processCreateImage = (nextProps) => {
    if (nextProps.createImage.requesting) {
      this.setState({
        processedImage: false,
      });
    }

    if (!nextProps.createImage.requesting && nextProps.createImage.image) {
      if (!this.state.processedImage) {
        this.props.actions.updateDevice(nextProps.device.id, {
          thumbnailId: nextProps.createImage.image.id,
        });

        this.props.actions.resetCreateImage();
        this.setState({
          processedImage: true,
        });
      }
    }
  };
  processDeleteImage = (nextProps) => {
    if (nextProps.deleteImage.requesting) {
      this.setState({
        processedDeleteImage: false,
      });
    }

    if (!nextProps.deleteImage.requesting && nextProps.deleteImage.image) {
      if (!this.state.processedDeleteImage) {
        // HACK - Fixes issue where image uploads would fail after deleting an image
        // Refreshing the page after deleting an image fixes this
        location.reload();
        /*
        this.props.actions.fetchDevice(nextProps.device.id);

        this.props.actions.resetDeleteImage();
        this.setState({
          processedDeleteImage: true,
        });
        */
      }
    }
  };
  render() {
    const error = () => {
      if (this.props.createImage.error || this.props.updateDevice.error) {
        return <div className="ui error message">
          <div className="header">Whoops</div>
          <p>Something went wrong there. Refresh and try again.</p>
        </div>;
      } else {
        return null;
      }
    };
    const form = <Form onSubmit={this.handleSubmit} requestingCreateImage={this.props.createImage.requesting} />;
    const image = <Image data={this.props.device.thumbnail} actions={this.props.actions} />;

    return (
      <div className={classes.uploader}>
        { error() }
        { this.props.device.thumbnail ? image : form }
      </div>
    );
  }
}