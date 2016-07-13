import { handleActions } from 'redux-actions';

const initialState = {
  createUser: {
    requesting: false,
    user: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_CREATE_USER: (state, action) => ({
    ...state,
    createUser: {
      ...state.createUser,
      requesting: true,
      user: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_USER: {
    next(state, action) {
      return {
        ...state,
        createUser: {
          ...state.createUser,
          requesting: false,
          user: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createUser: {
          ...state.createUser,
          requesting: false,
          user: null,
          error: action.payload,
        },
      };
    }
  }
}, initialState);
