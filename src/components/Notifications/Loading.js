import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

const spinner = classNames(
  'ui active inverted inline loader',
  classes.loadingSpinner
);

export default class Loading extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
  };
  state = {
    display: this.props.display,
  };
  componentWillReceiveProps(nextProps) {
    this.state.display = nextProps.display;
  };
  render() {
    return (
      <CSSTransition
        in={this.props.display}
        unmountOnExit={true}
        key="loading"
        classNames="notification"
        appear={true}
        timeout={{ enter: 500, exit: 500 }}>
        <li className={classes.notification}>
          <div>
            <div className={spinner}></div>
            <p className={classes.loadingText}>Loading...</p>
          </div>
        </li>
      </CSSTransition>
    );
  }
}
