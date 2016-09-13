import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestCreateImage = createAction('REQUEST_CREATE_IMAGE');
export const receiveCreateImage = createAction('RECEIVE_CREATE_IMAGE');

export const requestDeleteImage = createAction('REQUEST_DELETE_IMAGE');
export const receiveDeleteImage = createAction('RECEIVE_DELETE_IMAGE');

export const resetCreateImage = createAction('RESET_CREATE_IMAGE');
export const resetDeleteImage = createAction('RESET_DELETE_IMAGE');

export function createImage(body) {
  return function (dispatch) {
    dispatch(requestCreateImage());

    data.request('image', 'post', null, null, body, {
      serialize: false,
    }).then(function (response) {
      dispatch(receiveCreateImage(response));
    }).catch(function (e) {
      dispatch(receiveCreateImage(e));
    });
  }
}

export function deleteImage(id) {
  return function (dispatch) {
    dispatch(requestDeleteImage());

    data.request('image', 'DELETE', id, null, null)
      .then(function (response) {
        dispatch(receiveDeleteImage(response));
      }).catch(function (e) {
        dispatch(receiveDeleteImage(e));
      });
  }
}
