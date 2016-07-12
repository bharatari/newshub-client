import { createSelector } from 'reselect';
import wizard from './utils';
import _ from 'lodash';

const getDevices = (state) => _.get(state, 'device.fetchDevices.devices', null);
const getSelectedDevices = (state) => _.get(state, 'form.newReservation.values.devices', null);

export const getRemainingDevices = createSelector(
  getDevices,
  getSelectedDevices,
  (devices, selectedDevices) => {
    return wizard.getRemainingDevices(devices, selectedDevices);
  }
);
