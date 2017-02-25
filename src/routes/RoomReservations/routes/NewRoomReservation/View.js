import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card, Modal } from 'components/';
import { Form, Wizard, ModalContent } from './components';
import { animateScroll as scroll } from 'react-scroll';

export default class NewRoomReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    requestedRooms: false,
  }
  componentDidMount() {
    this.props.actions.resetCreateRoomReservation();
    this.props.actions.resetFetchRoomReservations();
    this.props.actions.fetchRooms(null, null, false);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newReservation) {
      const { startDate, endDate } = nextProps.newReservation.values;
      const { startDate: oldStartDate, endDate: oldEndDate } = this.props.newReservation.values;

      if (startDate && endDate) {
        if ((startDate !== oldStartDate) || (endDate !== oldEndDate)) {
          this.props.actions.fetchRooms(startDate, endDate, false);
          this.props.actions.fetchRoomReservations({
            startDate,
            endDate,
            page: 1,
            disabled: false,
          });
          this.setState({
            requestedRooms: false,
          });
        }
      }  
    }
  }
  handleSubmit = (values) => {
    this.props.actions.createRoomReservation(values);
    scroll.scrollToTop();
  };
  handleClick = () => {
    this.refs.form.submit();
  };
  render() {
    const button = classNames(
      'ui animated button blue inverted button-light',
      { loading: this.props.requestingCreateReservation }
    );
    const disable = this.props.requestingCreateRoomReservation || this.props.createdRoomReservation;
    const loading = this.props.requestingCreateRoomReservation || this.props.requestingRooms;
    const right = <button className={button} disabled={disable}
                    onClick={this.handleClick}>
                    <div className="visible content">SAVE</div>
                    <div className="hidden content">
                      <i className="checkmark icon"></i>
                    </div>
                  </button>;
    const message = <div className="ui success message">
                      <div className="header">
                        Your reservation has been created.
                      </div>
                      <p>It will need to be approved by a member of management.</p>
                    </div>

    return (
      <div>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Room Reservation" right={right} loading={loading} user={this.props.user}>
          <Card column="sixteen">
            { this.props.createdRoomReservation ? message : null }
            <Form ref="form" requestingCreateReservation={this.props.requestingCreateReservation}
              onSubmit={this.handleSubmit} rooms={this.props.rooms} />
            {right}
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
;