import { handleActions } from 'redux-actions';

const initialState = {
  file: {
    requesting: false,
    error: null,
    file: null,
  },
};

export default handleActions({
  REQUEST_UPLOAD_FILE: (state) => ({
    ...state,
    file: {
      ...state.file,
      requesting: true,
      error: null,
      file: null,
    },
  }),
  RECEIVE_UPLOAD_FILE: {
    next(state, action) {
      return {
        ...state,
        file: {
          ...state.file,
          requesting: false,
          error: null,
          file: action.payload,
        },
      };
    },
    throw(state, action) {
      console.log(action.payload);
      return {
        ...state,
        file: {
          ...state.file,
          requesting: false,
          error: action.payload,
          file: null,
        },
      };
    },
  },
  RESET_UPLOAD_FILE: (state, action) => ({
    ...state,
    file: {
      ...state.file,
      requesting: false,
      file: null,
      error: null,
    },
  }),
}, initialState);
