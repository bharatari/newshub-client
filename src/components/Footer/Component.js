import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import config from 'constants/config';

const brand = classNames(
  'ui centered',
  classes.brand
);

const footer = classNames(
  classes.footer
);

const container = classNames(
  'ui container',
  classes.container
);

function CoreLayout(props) {
  const { footer: { city } } = config;

  return (
    <div className={container}>
      <div className={classes.footer}>
        <p className={brand}>Hello from <strong>{city}.</strong></p>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
};

export default CoreLayout;
