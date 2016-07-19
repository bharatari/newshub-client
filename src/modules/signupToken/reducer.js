import { handleActions } from 'redux-actions';

const initialState = {
  requesting: false,
  token: null,
  error: null,
};

export default handleActions({
  REQUEST_SIGNUP_TOKEN: (state, action) => ({
    ...state,
    requesting: true,
    token: null,
    error: null,
  }),
  RECEIVE_SIGNUP_TOKEN: {
    next(state, action) {
      return {
        ...state,
        requesting: false,
        token: action.payload,
        error: null,
      };
    },
    throw(state, action) {
      return {
        ...state,
        requesting: false,
        token: null,
        error: action.payload,
      };
    }
  },
}, initialState);
