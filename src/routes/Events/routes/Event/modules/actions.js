import { createAction } from 'redux-actions';
import data from 'utils/data';
import userUtils from './utils';

export const requestUsers = createAction('routes/Event/REQUEST_USERS');
export const receiveUsers = createAction('routes/Event/RECEIVE_USERS');

export function searchUsers(options) {
  return function (dispatch) {
    dispatch(requestUsers());

    if (options) {
      let query = "";

      const { search } = options;

      if (search) {
        query += '&search=' + encodeURIComponent(search);
      }

      data.request('user', 'get', null, query, null)
        .then(function (response) {
          dispatch(receiveUsers(userUtils.processResponse(response)));
        }).catch(function (e) {
          dispatch(receiveUsers(e));
        })
    } else {
      data.request('user', 'get')
        .then(function (response) {
          dispatch(receiveUsers(userUtils.processResponse(response)));
        }).catch(function (e) {
          dispatch(receiveUsers(e));
        })
    }
  }
}
