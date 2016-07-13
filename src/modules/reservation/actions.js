import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestReservations = createAction('REQUEST_RESERVATIONS');
export const receiveReservations = createAction('RECEIVE_RESERVATIONS');

export const requestReservation = createAction('REQUEST_RESERVATION');
export const receiveReservation = createAction('RECEIVE_RESERVATION');

export const requestCreateReservation = createAction('REQUEST_CREATE_RESERVATION');
export const receiveCreateReservation = createAction('RECEIVE_CREATE_RESERVATION');

export const requestUpdateReservation = createAction('REQUEST_UPDATE_RESERVATION');
export const receiveUpdateReservation = createAction('RECEIVE_UPDATE_RESERVATION');

export const requestDeleteReservation = createAction('REQUEST_DELETE_RESERVATION');
export const receiveDeleteReservation = createAction('RECEIVE_DELETE_RESERVATION');

export function fetchReservations(filter, page) {
  return function (dispatch) {
    dispatch(requestReservations());

    data.request('reservation')
      .then(function (response) {
        dispatch(receiveReservations(response))
      }).catch(function (e) {
        dispatch(receiveReservations(e));
      });
  };
}



export function createReservation(body) {
  return function (dispatch) {
    dispatch(requestCreateReservation());

    data.request('reservation', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateReservation(response))
      }).catch(function (e) {
        dispatch(receiveCreateReservation(e));
      });
  };
}
