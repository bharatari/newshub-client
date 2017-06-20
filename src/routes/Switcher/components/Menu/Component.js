import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

const image = classNames(
  'ui avatar image',
  classes.image
);

const header = classNames(
  'header',
  classes.header
);

export default class Menu extends React.Component {
  static propTypes = {
    organizations: PropTypes.array,
    onClick: PropTypes.func,
  };
  render() {
    const options = () => {
      const array = [];

      for (let i = 0; i < this.props.organizations.length; i++) {
        const organization = this.props.organizations[i];

        const element = (
          <div key={i} className="item" onClick={() => this.props.onClick(organization)}>
            <img className={image} src={organization.logo}></img>
            <div className="content">
              <div className={header}>{organization.label}</div>
            </div>
          </div>
        );

        array.push(element);
      }

      return array;
    };

    return (
      <div className="ui middle aligned selection list">
        {options()}
      </div>
    );
  }
}
