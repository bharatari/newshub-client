import { createAction } from 'redux-actions';
import { localStorageAuthToken } from 'constants/keys';
import data from 'utils/data';

export const requestLogin = createAction('REQUEST_LOGIN');
export const receiveLogin = createAction('RECEIVE_LOGIN');

export const requestAuthenticated = createAction('REQUEST_AUTHENTICATED');
export const receiveAuthenticated = createAction('RECEIVE_AUTHENTICATED');
 
export function login() {
  return function (dispatch) {
    dispatch(requestLogin());

    data.request('login')
      .then(function (body) {
        localStorage.setItem(localStorageAuthToken, body.token);
        dispatch(receiveLogin());
      }).catch(function (e) {
        dispatch(receiveLogin(e));
      });
  }
}

export function fetchAuthenticated() {
  return function (dispatch) {
    dispatch(requestAuthenticated());
    
    if (localStorage.getItem(localStorageAuthToken)) {
      data.request('user')
        .then(function (authenticated) {
          dispatch(receiveAuthenticated(authenticated));
        }).catch(function (e) {
          dispatch(receiveAuthenticated(e));
        });
    } else {
      dispatch(receiveAuthenticated(new Error('Unauthenticated')));
    }
  }
}

