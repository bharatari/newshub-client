import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestSignupToken = createAction('REQUEST_SIGNUP_TOKEN');
export const receiveSignupToken = createAction('RECEIVE_SIGNUP_TOKEN');

export function createSignupToken() {
  return function (dispatch) {
    dispatch(requestSignupToken());

    data.request('signup-token', 'post')
      .then(function (response) {
        dispatch(receiveSignupToken(response))
      }).catch(function (e) {
        dispatch(receiveSignupToken(e));
      });
  };
}
