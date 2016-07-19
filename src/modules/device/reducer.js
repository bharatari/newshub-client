import { handleActions } from 'redux-actions';

const initialState = {
  fetchDevices: {
    requesting: false,
    devices: null,
    error: null,
  },
  fetchDevice: {
    requesting: false,
    device: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_DEVICES: (state, action) => ({
    ...state,
    fetchDevices: {
      ...state.fetchDevices,
      requesting: true,
    },
  }),
  RECEIVE_DEVICES: {
    next(state, action) {
      return {
        ...state,
        fetchDevices: {
          ...state.fetchDevices,
          requesting: false,
          devices: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchDevices: {
          ...state.fetchDevices,
          requesting: false,
          devices: null,
          error: action.payload,
        },
      };
    }
  },
  REQUEST_DEVICE: (state, action) => ({
    ...state,
    fetchDevice: {
      ...state.fetchDevice,
      requesting: true,
      device: null,
      error: null,
    },
  }),
  RECEIVE_DEVICE: {
    next(state, action) {
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          requesting: false,
          device: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          requesting: false,
          device: null,
          error: action.payload,
        },
      };
    }
  }
}, initialState);
