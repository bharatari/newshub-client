import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card, Status, Paginator } from 'components/';

export default class PaginatedTable extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.getData(this.props);
  }
  getData = (props) => {
    this.props.fetch({
      sortField: props.sortField,
      sortType: props.sortType,
      page: props.page,
      ...this.props.filter,
    });
  };
  goToPage = (page, event) => {
    const query = {
      ...this.props.location.query,
      page,
    };

    this.props.actions.push({
      ...this.props.location,
      query,
    });
    
    const { sortField, sortType } = query;

    this.getData({
      sortField,
      sortType,
      page,
    });
  };
  sortBy = (sortField, sortType) => {
    const query = {
      ...this.props.location.query,
      sortType,
      sortField,
    };

    this.props.actions.push({
      ...this.props.location,
      query,
    });

    const { page } = query;

    this.getData({
      sortField,
      sortType,
      page,
    });
  };
  render() {
    return (
      <div>
        <Card column="sixteen">
          {
            this.props.data ?
            <div>
              <Table fields={this.props.fields}
                data={this.props.data} 
                actions={this.props.actions}
                route={this.props.route} 
                sortBy={this.sortBy}
                sortField={this.props.sortField} 
                sortType={this.props.sortType} 
                sortable={true} />
              <Paginator currentPage={this.props.page} 
                totalPages={this.props.totalPages} 
                goToPage={this.goToPage} />
            </div>
            : <TextLoading loading={this.props.loading} />
          }
        </Card>
      </div>
    );
  }
}
