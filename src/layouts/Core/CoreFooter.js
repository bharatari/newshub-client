import React, { PropTypes } from 'react';
import classes from './Core.scss';
import classNames from 'classnames';

const brand = classNames(
  'ui centered',
  classes.brand
);

const footer = classNames(
  classes.footer
);

function CoreLayout(props) {
  return (
    <div className="ui container">
      <div className={footer}>
        <p className={brand}>Hello from <strong>Dhahran.</strong></p>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
};

export default CoreLayout;
