import React, { PropTypes } from 'react';
import Row from './Row';
import classes from './Styles.scss';
import classNames from 'classnames';

const table = classNames(
  'ui selectable very basic table',
  classes.table
);

export default class Table extends React.Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    data: PropTypes.array,
    route: PropTypes.string,
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    newTab: PropTypes.bool,
  };
  render() {
    const headers = () => {
      let array = [];
      let counter = 0;

      this.props.fields.map((field) => {
        array.push(<th key={counter} className={classes.header}>{field.label}</th>);
        counter++;
      });

      return array;
    };
    const rows = () => {
      let array = [];
      let counter = 0;

      if (this.props.data) {
        this.props.data.map((item) => {
          array.push(<Row key={counter} fields={this.props.fields}
                      data={item} route={this.props.route}
                      actions={this.props.actions} 
                      newTab={this.props.newTab} />);
          counter++;
        });
      }
      
      return array;
    };

    return (
      <table className={table}>
        <thead>
          <tr>
            {headers()}
          </tr>
        </thead>
        <tbody>
          {rows()}
        </tbody>
      </table>
    );
  }
}
