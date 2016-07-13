import React, { PropTypes } from 'react';
import _ from 'lodash';
import { FormatDate } from 'components/';

export default class Row extends React.Component {
  static propTypes = {
    fields: PropTypes.array,
    data: PropTypes.object,
    route: PropTypes.string,
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  handleClick = () => {
    this.props.actions.push(route + '/' + this.data.id);
  };
  render() {
    const processField = (field, data) => {
      let result;

      if (field.custom) {
        result = field.custom(data);
      } else {
        result = _.get(data, field.property);
      }

      if (field.type) {
        if (field.type === 'date') {
          return <FormatDate date={result} />;
        }
      }

      return result;
    };
    const cells = () => {
      let array = [];
      let counter = 0;

      this.props.fields.map((field) => {
        array.push(<td key={counter}>{processField(field, this.props.data)}</td>)
        counter++;
      });

      return array;
    };

    return (
      <tr onClick={this.handleClick}>
        {cells()}
      </tr>
    );
  }
}
