import { createAction } from 'redux-actions';
import data from 'utils/data';
import utils from './utils';

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

export const resetCreateDevice = createAction('RESET_CREATE_DEVICE');
export const resetUpdateDevice = createAction('RESET_UPDATE_DEVICE');

export function fetchDevices(startDate, endDate) {
  return function (dispatch) {
    dispatch(requestDevices());
    
    let query = {};

    if (startDate && endDate) {
      query = { startDate, endDate };
    }

    data.request('device', 'get', null, query)
      .then(function (response) {
        dispatch(receiveDevices(utils.processResponse(response)));
      }).catch(function (e) {
        dispatch(receiveDevices(e));
      });
  };
}

export function fetchDevice(id) {
  return function (dispatch) {
    dispatch(requestDevice());

    data.request('device', 'get', id)
      .then(function (response) {
        dispatch(receiveDevice(response));
      }).catch(function (e) {
        dispatch(receiveDevice(e));
      });
  };
}

export function createDevice(body) {
  return function (dispatch) {
    dispatch(requestCreateDevice());

    data.request('device', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateDevice(response));
      }).catch(function (e) {
        dispatch(receiveCreateDevice(e));
      });
  };
}

export function updateDevice(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateDevice());

    data.request('device', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateDevice(response));
      }).catch(function (e) {
        dispatch(receiveUpdateDevice(e));
      });
  };
}
