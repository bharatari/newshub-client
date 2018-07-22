import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestUploadFile = createAction('REQUEST_UPLOAD_FILE');
export const receiveUploadFile = createAction('RECEIVE_UPLOAD_FILE');

export const resetUploadFile = createAction('RESET_UPLOAD_FILE');

export function uploadFile(body) {
  return function (dispatch) {
    dispatch(requestUploadFile());

    data.request('file', 'post', null, null, body, {
      serialize: false,
    }).then(function (response) {
      dispatch(receiveUploadFile(response));
    }).catch(function (e) {
      dispatch(receiveUploadFile(e));
    });
  }
}
