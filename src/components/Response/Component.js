import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classes from './Styles.scss';
import classNames from 'classnames';
import errors from 'utils/errors';
import { Alert } from 'antd';
import * as authentication from 'modules/authentication/actions';

class Response extends React.Component {
  static propTypes = {
    error: PropTypes.any,
    response: PropTypes.any,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      if (nextProps.error.message === 'NOT_AUTHENTICATED') {
        this.props.actions.logout();
      }
    }
  }
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
        <Alert message={this.errorHeader()} description={this.errorText()} type="error" showIcon />
      );
    } else if (this.props.response) {
      return (
        <Alert message={this.props.successHeader} description={this.props.successText} type="success" showIcon />
      );
    }

    return null;
  }
}

const mapStateToProps = (state, ownProps) => ({});

const actionCreators = {
  ...authentication,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Response);
