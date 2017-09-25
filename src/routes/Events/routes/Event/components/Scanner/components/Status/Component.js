import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Status extends React.Component {
  static propTypes = {
    focused: PropTypes.bool,
  };
  render() {
    const status = () => {
      if (this.props.focused) {
        return <h3 className={classes.statusText}>Scanner Active</h3>
      }

      return  <h3 className={classes.statusText} onClick={this.props.onClick}>Click to Activate</h3>
    };
    return (
      <div>
        {status()}
      </div>
    );
  }
}
