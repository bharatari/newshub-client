import { handleActions } from 'redux-actions';

const initialState = {
  fetchReservations: {
    requesting: false,
    reservations: null,
    error: null,
  },
  createReservation: {
    requesting: false,
    reservation: null,
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
  },
  REQUEST_CREATE_RESERVATION: (state, action) => ({
    ...state,
    createReservation: {
      ...state.createReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_CREATE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        createReservation: {
          ...state.createReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        createReservation: {
          ...state.createReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
