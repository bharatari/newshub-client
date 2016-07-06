import React from 'react';
import classes from './Styles.scss';

export default class NotFoundView extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className={classes.container}>
          <h1 className={classes.text}>Looks like you're lost.</h1>
        </div>
      </div>
    );
  }
}
