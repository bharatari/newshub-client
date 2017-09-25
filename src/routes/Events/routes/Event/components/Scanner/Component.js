import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { FormatDate } from 'components/';
import { Status } from './components';
import event from 'modules/event/utils';
import user from 'modules/user/utils';
import _ from 'lodash';

const checkIcon = classNames(
  'ion-ios-checkmark-outline',
  classes.checkIcon
);

const barcodeIcon = classNames(
  'ion-ios-barcode-outline',
  classes.barcodeIcon
);

const input = classNames(
  'ui input',
  classes.barcodeInput
);

const inputContainer = classNames(
  'ui fluid transparent input',
  classes.inputContainer
);

export default class Content extends React.Component {
  static propTypes = {

  };
  state = {
    focused: false,
    displayUser: false,
    barcode: '',
  };
  handleSubmit = (event) => {
    event.preventDefault();

    this.props.actions.createLog({
      barcode: this.state.barcode,
      eventId: this.props.event.id,
    });
  };
  focus = () => {
    this.barcodeInput.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({ focused: false });
  };
  handleChange = (event) => {
    this.setState({ barcode: event.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.requestingCreateLog && !nextProps.requestingCreateLog) {
      if (nextProps.log) {
        if (nextProps.log.targetUser) {
          this.setState({ displayUser: true });

          setTimeout(() => {
            this.setState({ displayUser: false, barcode: '' });
          }, 3000);
        }
      }
    }
  }
  render() {
    const scannerContainerStyles = classNames(
      classes.scannerContainer,
      { [classes.displayUserDetails]: this.state.displayUser }
    );

    const contentContainer = classNames(
      classes.contentContainer,
      { [classes.displayUserDetails]: this.state.displayUser }
    );

    const userDetailsContainer = classNames(
      classes.userDetailsContainer,
      { [classes.displayUserDetails ]: this.state.displayUser }
    );

    const userDetails = () => {
      if (this.props.log) {
        if (this.props.log.targetUser) {
          return (
            <div className={userDetailsContainer}>
              <i className={checkIcon}></i>

              <h3 className={classes.userName}>{this.props.log.targetUser.fullName}</h3>
            </div>
          )
        }
      }
    };

    return (
      <div className={contentContainer}>
        <div className={scannerContainerStyles}>
          <i className={barcodeIcon}></i>

          <Status focused={this.state.focused} onClick={this.focus} />

          <form onSubmit={this.handleSubmit}>
            <div className={inputContainer}>     
              <input type="text" ref={(input) => { this.barcodeInput = input; }} value={this.state.barcode} className={input}
                onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
              <input type="submit" style={{ display: 'none' }} />
            </div>
          </form>
        </div>
        
        {userDetails()}
      </div>
    );
  }
}