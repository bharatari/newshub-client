import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Loading extends React.Component {
  static propTypes = {
    display: PropTypes.bool.isRequired
  }
  state = {
    display: this.props.display
  }
  componentWillReceiveProps = (nextProps) => {
    this.state.display = nextProps.display;
  }
  render() {
    var loading;
    if (this.state.display) {
      loading =
        <li className="notification">
          <div>
            <i className="ion-ios-loop loading-spinner"></i>
            <p className="loading-text">Loading...</p>
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
