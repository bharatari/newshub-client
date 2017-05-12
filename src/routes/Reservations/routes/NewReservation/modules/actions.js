import { createAction } from 'redux-actions';
import data from 'utils/data';

export const showModal = createAction('routes/NewReservation/SHOW_MODAL');
export const hideModal = createAction('routes/NewReservation/HIDE_MODAL');

export const requestReservation = createAction('routes/NewReservation/REQUEST_RESERVATION');
export const receiveReservation = createAction('routes/NewReservation/RECEIVE_RESERVATION');
export const resetFetchReservation = createAction('routes/NewReservation/RESET_FETCH_RESERVATION');

export function fetchReservation(id) {
  return function (dispatch) {
    dispatch(requestReservation());

    data.request('reservation', 'get', id)
      .then(function (response) {
        dispatch(receiveReservation(response));
        dispatch(showModal());
      }).catch(function (e) {
        dispatch(receiveReservation(e));
      });
  };
}

export function resetReservation() {
  return function (dispatch) {
    dispatch(hideModal());
    dispatch(clearFetchReservation());
  };
}