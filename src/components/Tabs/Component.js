import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

const tabs = classNames(
  classes.tabs,
  'ui secondary stackable pointing menu'
);

export default class Tabs extends React.Component {
  static propTypes = {
    fields: PropTypes.any,
  };
  componentDidMount() {
    $('.pointing.menu .item').tab();
  }
  componentDidUpdate() {
    $('.pointing.menu .item').tab('refresh');
  }
  render() {
    const headers = () => {
      let array = [];

      if (this.props.fields) {
        for (let property in this.props.fields) {
          if (this.props.fields.hasOwnProperty(property)) {
            array.push(
              <div className="item" key={property} data-tab={property}>{property}</div>
            );
          }
        }        
      }

      return array;
    };

    return (
      <div>
        <div className={tabs}>
          {headers()}
        </div>
        {this.props.children}
      </div>
    );
  }
}
