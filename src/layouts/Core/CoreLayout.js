import React, { PropTypes } from 'react';
import classes from './Core.scss';
import CoreNavbar from './CoreNavbar';
import CoreFooter from './CoreFooter';
import classNames from 'classnames';

function CoreLayout({ children, rightNavbar, leftNavbar }) {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
  rightNavbar: PropTypes.element,
};

export default CoreLayout;
