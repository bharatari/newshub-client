import { handleActions } from 'redux-actions';

const initialState = {
  login: {
    requesting: false,
    response: false,
    error: null,
  },
  error: null,
  authenticated: false,
  requestingAuthenticated: false,
  logout: false,
};

export default handleActions({
  REQUEST_LOGOUT: (state, action) => ({
    ...state,
    logout: true,
  }),
  RESET_LOGIN: (state, action) => ({
    ...state,
    login: {
      ...state.login,
      requesting: false,
      response: false,
      error: null,
    },
  }),
  REQUEST_LOGIN: (state, action) => ({
    ...state,
    login: {
      ...state.login,
      requesting: true,
      response: false,
      error: null,
    },
    logout: false,
  }),
  RECEIVE_LOGIN: {
    next(state, action) {
      return {
        ...state,
        login: {
          ...state.login,
          requesting: false,
          response: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        login: {
          ...state.login,
          requesting: false,
          authenticated: false,
          error: action.payload,
        },
      }
    }
  },
  REQUEST_AUTHENTICATED: (state, action) => ({
    ...state,
    requestingAuthenticated: true,
  }),
  RECEIVE_AUTHENTICATED: {
    next(state, action) {
      return {
        ...state,
        requestingAuthenticated: false,
        authenticated: true,
      };
    },
    throw(state, action) {
      return {
        ...state,
        error: action.payload,
        requestingAuthenticated: false,
        authenticated: false,
      };
    }
  },
}, initialState);
