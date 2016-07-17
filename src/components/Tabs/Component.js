import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';

export default class Tabs extends React.Component {
  static propTypes = {
    fields: PropTypes.any,
  };
  componentDidMount() {
    $('.tabular.menu .item').tab();
  }
  componentDidUpdate() {
    $('.tabular.menu .item').tab('refresh');
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
        <div className="ui tabular menu">
          {headers()}
        </div>
        {this.props.children}
      </div>
    );
  }
}
