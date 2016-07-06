import { createAction } from 'redux-actions';
import { localStorageAuthToken } from 'constants/keys';
import data from 'utils/data';

export const requestUser = createAction('REQUEST_USER');
export const receiveUser = createAction('RECEIVE_USER');

export const requestCreateUser = createAction('REQUEST_CREATE_USER');
export const receiveCreateUser = createAction('RECEIVE_CREATE_USER');

export const requestUpdateUser = createAction('REQUEST_UPDATE_USER');
export const receiveUpdateUser = createAction('RECEIVE_UPDATE_USER');

export function fetchUser() {
  return function (dispatch) {
    dispatch(requestUser());
    
    if (localStorage.getItem(localStorageAuthToken)) {
      data.request('user')
        .then(function (user) {
          dispatch(receiveUser(user));
        }).catch(function (e) {
          dispatch(receiveUser(e));
        });
    } else {
      dispatch(receiveUser(new Error('Unauthenticated')));
    }
  }
}

export function createUser(body) {
  return function (dispatch) {
    dispatch(requestCreateUser());

    data.request('user', 'POST', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateUser(response));
      }).catch(function (e) {
        dispatch(receiveCreateUser(e));
      })
  }
}

export function updateUser(body, userId) {
  return function (dispatch) {
    dispatch(requestUpdateUser());
    
    console.log('requested');
    data.request('user', 'PATCH', userId, null, body)
      .then(function (user) {
        dispatch(receiveUpdateUser(user));
      }).catch(function (e) {
        dispatch(receiveUpdateUser(e));
      });
  }
}
