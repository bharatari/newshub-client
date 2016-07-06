,import { handleActions } from 'redux-actions';

const initialState = {
  requestingDevices: false,
  requestingDevice: false,
  collection: [],
  error: null,
};

export default handleActions({
  REQUEST_DEVICES: (state, action) => ({
    ...state,
    requestingDevices: true,
  }),
  RECEIVE_DEVICES: {
    next(state, action) {
      return {
        ...state,
        requestingDevices: false,
        collection: [
          ...action.payload,
        ],
      };
    },
    throw(state, action) {
      return {
        ...state,
        requestingDevices: false,
        error: action.payload,
      };
    }
  },
  REQUEST_DEVICE: (state, action) => ({
    ...state,
    requestingDevice: true
  }),
  RECEIVE_DEVICE: {
    next(state, action) {
      return {
        ...state,
        requestingDevice: false,
        collection: [
          ...state.collection,
          action.payload,
        ],
      };
    },
    throw(state, action) {
      return {
        ...state,
        requestingDevices: false,
        error: action.payload,
      };
    }
  }
}, initialState);
