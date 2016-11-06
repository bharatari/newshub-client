import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card, Status, Paginator } from 'components/';

export default class Data extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.goToFirstPage();
  }
  handleClick = () => {
    this.props.actions.push(this.props.newURL);
  };
  render() {
    const right = <button className="ui animated button blue inverted button-light" onClick={this.handleClick}>
                    <div className="visible content">ADD</div>
                    <div className="hidden content">
                      <i className="add circle icon"></i>
                    </div>
                  </button>;

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header={this.props.header} right={right} loading={this.props.loading}
          user={this.props.user}>
          <Card column="sixteen">
            {
              this.props.data ?
              <div>
                <Table fields={this.props.fields}
                  data={this.props.data} 
                  actions={this.props.actions}
                  route={this.props.route} />
                <Paginator currentPage={this.props.currentPage} 
                  totalPages={this.props.totalPages} goToPage={this.props.goToPage}
                  goToFirstPage={this.props.goToFirstPage} goToLastPage={this.props.goToLastPage} />
              </div>
              : <TextLoading loading={this.props.loading} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
