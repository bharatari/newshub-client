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

export const resetCreateReservation = createAction('RESET_CREATE_RESERVATION');
export const resetFetchReservations = createAction('RESET_FETCH_RESERVATIONS');
export const resetUpdateReservation = createAction('RESET_UPDATE_RESERVATION');

export function fetchReservation(id) {
  return function (dispatch) {
    dispatch(requestReservation());

    data.request('reservation', 'get', id)
      .then(function (response) {
        dispatch(receiveReservation(response))
      }).catch(function (e) {
        dispatch(receiveReservation(e));
      });
  };
}

export function fetchReservations(startDate, endDate) {
  return function (dispatch) {
    dispatch(requestReservations());

    let query = '?$sort[startDate]=1&$limit=10';

    if (startDate && endDate) {
      query += '&startDate=' + encodeURIComponent(startDate);
      query += '&endDate=' + encodeURIComponent(endDate);
    }

    data.request('reservation', 'get', null, query)
      .then(function (response) {
        dispatch(receiveReservations(response));
      }).catch(function (e) {
        dispatch(receiveReservations(e));
      });
  };
}

export function updateReservation(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateReservation());

    data.request('reservation', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateReservation(response))
      }).catch(function (e) {
        dispatch(receiveUpdateReservation(e));
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
