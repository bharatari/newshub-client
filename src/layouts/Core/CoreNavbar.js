import React, { PropTypes } from 'react';
import classes from './Core.scss';
import classNames from 'classnames';

const avatar = classNames(
  'ui avatar image',
  classes.placeholderAvatar
);

const navbar = classNames(
  'ui borderless fixed menu menu-tall',
  classes.coreNavbar
);

function CoreLayout(props) {
  return (
    <div className={navbar}>
      <div className="ui container">
        {props.leftNavbar}
        <a className="header item" href="/">
          <h4 className={classes.logo}>NewsHub</h4>
        </a>
        <div className="item right">
          {props.rightNavbar}
        </div>
      </div>
    </div>
  );
}

CoreLayout.propTypes = {
  children: PropTypes.element,
  rightNavbar: PropTypes.element,
};

export default CoreLayout;
