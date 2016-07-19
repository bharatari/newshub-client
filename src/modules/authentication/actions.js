import { createAction } from 'redux-actions';
import { localStorageAuthToken } from 'constants/keys';
import data from 'utils/data';

export const resetLogin = createAction('RESET_LOGIN');
export const requestLogin = createAction('REQUEST_LOGIN');
export const receiveLogin = createAction('RECEIVE_LOGIN');

export const requestLogout = createAction('REQUEST_LOGOUT');
 
export function login(body) {
  return function (dispatch) {
    dispatch(requestLogin());

    data.request('login', 'post', null, null, body, {
      resolve: false,
    }).then(function (body) {
      localStorage.setItem(localStorageAuthToken, body.token);
      dispatch(receiveLogin(body));
    }).catch(function (e) {
      dispatch(receiveLogin(e));
    });
  }
}

export function logout() {
  return function (dispatch) {
    localStorage.removeItem(localStorageAuthToken);
    dispatch(requestLogout());
  }
}
