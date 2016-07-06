import { handleActions } from 'redux-actions';

const initialState = {
  requestingReservations: false,
  data: null,
  error: {}
};

export default handleActions({
  REQUEST_RESERVATIONS: (state, action) => ({
    ...state,
    requestingReservations: true,
  }),
  RECEIVE_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        requestingReservations: false,
        data: action.payload,
      };
    },
    throw(state, action) {
      return {
        ...state,
        requestingReservations: false,
        data: null,
        error: action.payload,
      };
    }
  }
}, initialState);
