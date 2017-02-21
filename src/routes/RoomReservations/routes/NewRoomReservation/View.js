import React, { PropTypes } from 'react';
import classes from './Styles.scss';
import classNames from 'classnames';
import { SidebarPage, Table, Card, Modal } from 'components/';
import { Form, Wizard, ModalContent } from './components';
import { animateScroll as scroll } from 'react-scroll';

export default class NewReservationView extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    user: PropTypes.object,
  };
  state = {
    requestedDevices: false,
  }
  componentDidMount() {
    this.props.actions.resetCreateReservation();
    this.props.actions.resetFetchReservations();
    this.props.actions.fetchDevices(null, null, false);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.newReservation) {
      const { startDate, endDate } = nextProps.newReservation.values;
      const { startDate: oldStartDate, endDate: oldEndDate } = this.props.newReservation.values;

      if (startDate && endDate) {
        if ((startDate !== oldStartDate) || (endDate !== oldEndDate)) {
          this.props.actions.fetchDevices(startDate, endDate, false);
          this.props.actions.fetchReservations({
            startDate,
            endDate,
            page: 1,
            disabled: false,
          });
          this.setState({
            requestedDevices: false,
          });
        } else if (this.props.requestingDevices) {
          if (!this.state.requestedDevices) {
            this.props.actions.setWizardValue({
              name: 'newReservation',
              key: 'selectedDevices',
              value: [],
            });

            this.setState({
              requestedDevices: true,
            });
          }
        }
      }  
    }
  }
  handleSubmit = (values) => {
    this.props.actions.createReservation(values);
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
    const disable = this.props.requestingCreateReservation || this.props.createdReservation;
    const loading = this.props.requestingCreateReservation || this.props.requestingDevices || this.props.requestingReservations || this.props.requestingFetchReservation;
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
        <Modal id="new-reservation-modal" show={this.props.showModal} hideActions={true}
        cancelText="Close" hideModal={this.props.localActions.resetReservation}
        scrollable={true}>
          <ModalContent action={this.props.localActions.fetchReservation} data={this.props.reservation} />
        </Modal>
        <SidebarPage currentUrl={this.props.currentUrl} actions={this.props.actions}
          header="New Reservation" right={right} loading={loading} user={this.props.user}>
          <Card column="sixteen">
            { this.props.createdReservation ? message : null }
            <Form ref="form" remainingDevices={this.props.remainingDevices}
              requestingCreateReservation={this.props.requestingCreateReservation}
              onSubmit={this.handleSubmit} selectedDevices={this.props.selectedDevices} />
            <Wizard actions={this.props.actions} selectedDevices={this.props.selectedDevices}
              remainingDevices={this.props.remainingDevices} reservations={this.props.reservations}
              localActions={this.props.localActions} />
            {right}
          </Card>
        </SidebarPage>
      </div>
    );
  }
}
;