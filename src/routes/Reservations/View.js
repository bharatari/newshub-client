import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, TextLoading, Card, Status, Paginator } from 'components/';
import reservation from 'modules/reservation/utils';

export default class ReservationsView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Start Date', property: 'startDate' , type: 'date' },
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', component: Status },
    ],
  };
  componentDidMount() {
    this.goToFirstPage();
  }
  handleClick = () => {
    this.props.actions.push('/app/reservation/new');
  };
  goToPage = (page, event) => {
    this.props.actions.fetchReservations(null, null, (page - 1) * 10);
  };
  goToFirstPage = () => {
    this.props.actions.fetchReservations(null, null, 0);
  };
  goToLastPage = () => {
    this.props.actions.fetchReservations(null, null, (this.props.totalPages - 1) * 10);
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
          header="Reservations" right={right} loading={this.props.requestingReservations}
          user={this.props.user}>
          <Card column="sixteen">
            {
              this.props.reservations ?
              <div>
                <Table fields={this.state.fields}
                  data={this.props.reservations} 
                  actions={this.props.actions}
                  route="/app/reservation" />
                <Paginator currentPage={this.props.currentPage} 
                  totalPages={this.props.totalPages} goToPage={this.goToPage}
                  goToFirstPage={this.goToFirstPage} goToLastPage={this.goToLastPage} />
              </div>
              : <TextLoading loading={this.props.requestingReservations} />
            }
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
