import { handleActions } from 'redux-actions';

const initialState = {
  error: null,
  requestingLogin: false,
  authenticated: false,
  requestingAuthenticated: false,
};

export default handleActions({
  REQUEST_LOGIN: (state, action) => ({
    ...state,
    requestingLogin: true,
  }),
  RECEIVE_LOGIN: {
    next(state, action) {
      return {
        ...state,
        requestingLogin: false,
        authenticated: true,
      };
    },
    throw(state, action) {
      return {
        ...state,
        error: action.payload,
        authenticated: false,
        requestingLogin: false,
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
