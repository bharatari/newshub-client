import { handleActions } from 'redux-actions';

const initialState = {
  requestingCreateUser: false,
  error: null,
  user: null,
};

export default handleActions({
  REQUEST_CREATE_USER: (state, action) => ({
    ...state,
    requestingCreateUser: true,
  }),
  RECEIVE_CREATE_USER: {
    next(state, action) {
      return {
        ...state,
        requestingCreateUser: false,
        user: action.payload,
      };
    },
    throw(state, action) {
      return {
        ...state,
        requestingCreateUser: false,
        error: action.payload,
      };
    }
  }
}, initialState);
