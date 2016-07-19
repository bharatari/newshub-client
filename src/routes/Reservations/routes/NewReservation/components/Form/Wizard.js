import React, { PropTypes } from 'react';
import Device from './Device';
import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import array from 'utils/array';
import classes from './Styles.scss';
import Group from './Group';
import { Tabs, Table } from 'components/';
import reservation from 'modules/reservation/utils';
import _ from 'lodash';

export default class NewReservationWizard extends React.Component {
  static propTypes = {
    selectedDevices: PropTypes.any,
    actions: PropTypes.object.isRequired,
    remainingDevices: PropTypes.object,
  };
  state = {
    fields: [
      { label: 'Name', property: 'user.fullName'},
      { label: 'Checked Out By', property: 'checkedOutBy.fullName' },
      { label: 'Status', property: 'status', custom: reservation.getReservationStatus.bind(reservation) },
      { label: 'Created', property: 'createdAt', type: 'date' },
    ]
  };
  componentDidMount() {
    let selectedDevices = [];

    this.props.actions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: selectedDevices
    });
  }
  handleClick = (device) => {
    let selectedDevices = [
      ...this.props.selectedDevices,
      device,
    ];

    this.props.actions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: selectedDevices
    });
  };
  handleChange = (device) => {
    let selectedDevices = this.props.selectedDevices;
    selectedDevices = array.updateById(selectedDevices, device.id, device);

    this.props.actions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: selectedDevices
    });
  };
  remove = (id) => {
    let selectedDevices = [
      ...this.props.selectedDevices,
    ];
    selectedDevices = array.deleteFromArrayById(selectedDevices, id);

    this.props.actions.setWizardValue({
      name: 'newReservation',
      key: 'selectedDevices',
      value: selectedDevices
    });
  };
  render() {
    const renderList = () => {
      let list = [];

      if (this.props.selectedDevices) {
        this.props.selectedDevices.forEach((device) => {
          list.push(
            <Device
              key={device.id}
              device={device}
              onChange={this.handleChange}
              remove={this.remove} />
          );
        });
      }
      
      return list;
    };

    const renderGroups = () => {
      let list = [];

      if (this.props.remainingDevices) {
        for (let property in this.props.remainingDevices) {
          if (this.props.remainingDevices.hasOwnProperty(property)) {
            list.push(
              <div className="ui tab" key={property} data-tab={property}>
                <Group
                  key={property}
                  name={property}
                  devices={this.props.remainingDevices[property]}
                  onClick={this.handleClick} />
              </div>
            );
          }
        }        
      }

      return list;
    };

    return (
      <div>
        <div className={classes.tabsContainer}>
          <Tabs fields={this.props.remainingDevices}>
            {renderGroups()}
          </Tabs>
        </div>
        <div className={classes.reservationDeviceContainer}>
          <ReactCSSTransitionGroup
            transitionName="reservation-device"
            transitionAppear={true} transitionAppearTimeout={300} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              {renderList()}
          </ReactCSSTransitionGroup>
        </div>
        {
          !_.isEmpty(this.props.reservations) ?
          <div>
            <h1 className={classes.groupHeader}>Reservations during this period</h1>
            <p className={classes.font}>Here are some reservations created during the same period. Double-check to make sure you aren't creating an extra reservations for the same project.</p>
            <Table fields={this.state.fields}
              data={this.props.reservations} 
              actions={this.props.actions}
              route="/app/reservation" newTab={true} />
          </div> : null
        }
      </div>
    )
  }
}
