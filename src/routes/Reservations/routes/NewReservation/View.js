import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card, Modal } from 'components/';
import { Form, ModalContent } from './components';
import { animateScroll as scroll } from 'react-scroll';

export default class NewReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  componentDidMount() {
    this.props.actions.resetCreateReservation();
    this.props.actions.resetFetchReservations();
  }
  handleSubmit = (values) => {
    this.props.actions.createReservation(values);

    scroll.scrollToTop();
  };
  render() {
    const loading = this.props.requestingCreateReservation || this.props.requestingDevices || this.props.requestingReservations || this.props.requestingFetchReservation;

    const message = (
      <div className="ui success message">
        <div className="header">
          Your reservation has been created.
        </div>
        <p>It will need to be approved by a member of management.</p>
      </div>
    );

    const wizard = {
      actions: this.props.actions,
      selectedDevices: this.props.selectedDevices,
      remainingDevices: this.props.remainingDevices,
      reservations: this.props.reservations,
      localActions: this.props.localActions,
      specialApproval: this.props.specialApproval,
      fetchDeviceByBarcode: this.props.fetchDeviceByBarcode,
    };

    return (
      <div>
        <Modal id="new-reservation-modal" show={this.props.showModal} hideActions={true}
        cancelText="Close" hideModal={this.props.localActions.resetReservation}
        scrollable={true}>
          <ModalContent action={this.props.localActions.fetchReservation} data={this.props.reservation} />
        </Modal>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Reservation" loading={loading} user={this.props.user}
          roles={this.props.roles}>
          <Card column="sixteen">
            { this.props.createdReservation ? message : null }
            <Form remainingDevices={this.props.remainingDevices}
              requestingCreateReservation={this.props.requestingCreateReservation}
              onSubmit={this.handleSubmit} selectedDevices={this.props.selectedDevices}
              wizard={wizard} localActions={this.props.localActions} />
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
;