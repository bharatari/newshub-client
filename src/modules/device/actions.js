import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestDevices = createAction('REQUEST_DEVICES');
export const receiveDevices = createAction('RECEIVE_DEVICES');

export const requestDevice = createAction('REQUEST_DEVICE');
export const receiveDevice = createAction('RECEIVE_DEVICE');

export const requestCreateDevice = createAction('REQUEST_CREATE_DEVICE');
export const receiveCreateDevice = createAction('RECEIVE_CREATE_DEVICE');

export const requestUpdateDevice = createAction('REQUEST_UPDATE_DEVICE');
export const receiveUpdateDevice = createAction('RECEIVE_UPDATE_DEVICE');

export const requestDeleteDevice = createAction('REQUEST_DELETE_DEVICE');
export const receiveDeleteDevice = createAction('RECEIVE_DELETE_DEVICE');

export function fetchDevices(startDate, endDate) {
  return function (dispatch) {
    dispatch(requestDevices());
    
    let query = {};

    if (startDate && endDate) {
      query = { startDate, endDate };
    }

    data.request('device', 'get', null, query, null)
      .then(function (response) {
        dispatch(receiveDevices(response));
      }).catch(function (e) {
        dispatch(receiveDevices(e))
      });
  };
}

export function fetchDevice(id) {
  return function (dispatch) {
    dispatch(requestDevice());
  };
}

export function createDevice(body) {
  return function (dispatch) {
    dispatch(requestCreateDevice());
  };
}

export function updateDevice() {

}

export function deleteDevice() {

}
