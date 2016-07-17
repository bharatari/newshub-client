import React, { PropTypes } from 'react';
import classes from './Core.scss';
import CoreNavbar from './CoreNavbar';
import CoreFooter from './CoreFooter';
import classNames from 'classnames';

const contentMargin = classNames(
  classes.contentMargin
);

function CoreLayout({ children, rightNavbar }) {
  return (
    <div>
      <CoreNavbar rightNavbar={rightNavbar} />
      <div className={contentMargin}>
        {children}
      </div>
      <CoreFooter />
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
  rightNavbar: PropTypes.element,
};

export default CoreLayout;
