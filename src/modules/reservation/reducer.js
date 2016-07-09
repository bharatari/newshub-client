import { handleActions } from 'redux-actions';

const initialState = {
  fetchReservations: {
    requesting: false,
    reservations: null,
    error: null,
  },
};

export default handleActions({
  REQUEST_RESERVATIONS: (state, action) => ({
    ...state,
    fetchReservations: {
      ...state.fetchReservations,
      requesting: true,
      reservations: null,
      error: null,
    },
  }),
  RECEIVE_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        fetchReservations: {
          ...state.fetchReservations,
          requesting: false,
          reservations: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchReservations: {
          ...state.fetchReservations,
          requesting: false,
          reservations: null,
          error: action.payload,
        },
      };
    }
  }
}, initialState);
