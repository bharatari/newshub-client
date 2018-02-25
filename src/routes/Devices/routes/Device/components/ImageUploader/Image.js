import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

function Image(props) {
  const imageBackground = {
    backgroundImage: 'url(' + props.data.url + ')',
  };
  const handleClick = () => {
    props.actions.handleRemoveImage(props.data.id);
  };

  return (
    <div className={classes.imageContainer}>
      <div className={classes.imageBox} style={imageBackground}></div>
      <button className="ui red button button-light" onClick={handleClick}>Remove</button>
      { props.data.requestingDeleteImage ? 'Deleting...' : null }
    </div>
  );
}

Image.propTypes = {
  data: PropTypes.object,
  actions: PropTypes.object,
};

export default Image;
