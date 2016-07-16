import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const spinner = classNames(
  'ui active inline loader',
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
    var loading;
    
    if (this.state.display) {
      loading =
        <li className={classes.notification}>
          <div>
            <div className={spinner}></div>
            <p className={classes.loadingText}>Loading...</p>
          </div>
        </li>
    } else {
      loading = null;
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="notification"
        transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {loading}
      </ReactCSSTransitionGroup>
    );
  }
}
