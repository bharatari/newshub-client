import { createSelector } from 'reselect';
import wizard from './utils';
import _ from 'lodash';

const getDevices = (state) => _.get(state, 'device.fetchDevices.devices', null);
const getSelectedDevices = (state) => _.get(state, 'wizard.newReservation.selectedDevices', null);

export const getRemainingDevices = createSelector(
  getDevices,
  getSelectedDevices,
  (devices, selectedDevices) => {
    return wizard.getRemainingDevices(devices, selectedDevices);
  }
);

export const groupDevices = createSelector(
  getRemainingDevices,
  (devices) => {
    return wizard.groupDevices(devices);
  }
);
