import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import errors from 'utils/errors';

export default class Table extends React.Component {
  static propTypes = {
    error: PropTypes.any,
    response: PropTypes.any,
  };
  errorText = () => {
    if (this.props.errorText) {
      return this.props.errorText;
    } else {
      return errors.getError(this.props.error.message).text;
    }
  };
  errorHeader = () => {
    if (this.props.errorHeader) {
      return this.props.errorHeader;
    } else {
      return errors.getError(this.props.error.message).header;
    }
  };
  render() {
    if (this.props.error) {
      return (
        <div className="ui error icon message">
          <i className="warning sign icon"></i>
          <div className="content">
            <div className="header">
              {this.errorHeader()}
            </div>
            <p>{this.errorText()}</p>
          </div>
        </div>
      );
    } else if (this.props.response) {
      return (
        <div className="ui success message">
          <div className="header">
            {this.props.successHeader}
          </div>
          <p>{this.props.successText}</p>
        </div>
      );
    }

    return null;
  }
}
