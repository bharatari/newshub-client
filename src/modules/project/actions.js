import { createAction } from 'redux-actions';
import data from 'utils/data';

export const requestProjects = createAction('REQUEST_PROJECTS');
export const receiveProjects = createAction('RECEIVE_PROJECTS');

export const requestProject = createAction('REQUEST_PROJECT');
export const receiveProject = createAction('RECEIVE_PROJECT');

export const requestCreateProject = createAction('REQUEST_CREATE_PROJECT');
export const receiveCreateProject = createAction('RECEIVE_CREATE_PROJECT');

export const requestUpdateProject = createAction('REQUEST_UPDATE_PROJECT');
export const receiveUpdateProject = createAction('RECEIVE_UPDATE_PROJECT');

export const requestDeleteProject = createAction('REQUEST_DELETE_PROJECT');
export const receiveDeleteProject = createAction('RECEIVE_DELETE_PROJECT');

export const resetCreateProject = createAction('RESET_CREATE_PROJECT');
export const resetFetchProjects = createAction('RESET_FETCH_PROJECT');
export const resetUpdateProject = createAction('RESET_UPDATE_PROJECT');

export function fetchProject(id) {
  return function (dispatch) {
    dispatch(requestProject());

    data.request('project', 'get', id)
      .then(function (response) {
        dispatch(receiveProject(response))
      }).catch(function (e) {
        dispatch(receiveProject(e));
      });
  };
}

export function fetchProjects(startDate, endDate) {
  return function (dispatch) {
    dispatch(requestProjects());

    let query = '?$sort[startDate]=1&$limit=10';

    data.request('project', 'get', null, query)
      .then(function (response) {
        dispatch(receiveProjects(utils.processResponse(response)));
      }).catch(function (e) {
        dispatch(receiveProjects(e));
      });
  };
}

export function updateProject(id, body) {
  return function (dispatch) {
    dispatch(requestUpdateProject());

    data.request('project', 'PATCH', id, null, body)
      .then(function (response) {
        dispatch(receiveUpdateProject(response))
      }).catch(function (e) {
        dispatch(receiveUpdateProject(e));
      });
  };
}

export function createProject(body) {
  return function (dispatch) {
    dispatch(requestCreateProject());

    data.request('project', 'post', null, null, body)
      .then(function (response) {
        dispatch(receiveCreateProject(response))
      }).catch(function (e) {
        dispatch(receiveCreateProject(e));
      });
  };
}
