import { handleActions } from 'redux-actions';

const initialState = {
  createImage: {
    requesting: false,
    error: null,
    image: null,
  },
  deleteImage: {
    requesting: false,
    error: null,
    image: null,
  },
};

export default handleActions({
  REQUEST_CREATE_IMAGE: (state) => ({
    ...state,
    createImage: {
      ...state.createImage,
      requesting: true,
      error: null,
      image: null,
    },
  }),
  RECEIVE_CREATE_IMAGE: {
    next(state, action) {
      return {
        ...state,
        createImage: {
          ...state.createImage,
          requesting: false,
          error: null,
          image: action.payload,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createImage: {
          ...state.createImage,
          requesting: false,
          error: action.payload,
          image: null,
        },
      };
    },
  },
  RESET_CREATE_IMAGE: (state, action) => ({
    ...state,
    createImage: {
      ...state.createImage,
      requesting: false,
      image: null,
      error: null,
    },
  }),
  REQUEST_DELETE_IMAGE: (state) => ({
    ...state,
    deleteImage: {
      ...state.deleteImage,
      requesting: true,
      error: null,
      image: null,
    },
  }),
  RECEIVE_DELETE_IMAGE: {
    next(state, action) {
      return {
        ...state,
        deleteImage: {
          ...state.deleteImage,
          requesting: false,
          error: null,
          image: action.payload,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        deleteImage: {
          ...state.deleteImage,
          requesting: false,
          error: action.payload,
          image: null,
        },
      };
    },
  },
  RESET_DELETE_IMAGE: (state, action) => ({
    ...state,
    deleteImage: {
      ...state.deleteImage,
      requesting: false,
      image: null,
      error: null,
    },
  }),
}, initialState);
