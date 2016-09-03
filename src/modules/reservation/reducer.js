import { handleActions } from 'redux-actions';

const initialState = {
  fetchReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  fetchReservations: {
    requesting: false,
    reservations: null,
    error: null,
    total: null,
  },
  createReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
  updateReservation: {
    requesting: false,
    reservation: null,
    error: null,
  },
};

export default handleActions({
  RESET_FETCH_RESERVATIONS: (state, action) => ({
    ...state,
    fetchReservations: {
      ...state.fetchReservations,
      requesting: false,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  REQUEST_RESERVATIONS: (state, action) => ({
    ...state,
    fetchReservations: {
      ...state.fetchReservations,
      requesting: true,
      reservations: null,
      error: null,
      total: null,
    },
  }),
  RECEIVE_RESERVATIONS: {
    next(state, action) {
      return {
        ...state,
        fetchReservations: {
          ...state.fetchReservations,
          requesting: false,
          reservations: action.payload.data,
          error: null,
          total: action.payload.total,
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
          total: null,
        },
      };
    }
  },
  REQUEST_RESERVATION: (state, action) => ({
    ...state,
    fetchReservation: {
      ...state.fetchReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        fetchReservation: {
          ...state.fetchReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
  RESET_CREATE_RESERVATION: (state, action) => ({
    ...state,
    createReservation: {
      ...state.createReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
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
  RESET_UPDATE_RESERVATION: (state, action) => ({
    ...state,
    updateReservation: {
      ...state.updateReservation,
      requesting: false,
      reservation: null,
      error: null,
    },
  }),
  REQUEST_UPDATE_RESERVATION: (state, action) => ({
    ...state,
    updateReservation: {
      ...state.updateReservation,
      requesting: true,
      reservation: null,
      error: null,
    },
  }),
  RECEIVE_UPDATE_RESERVATION: {
    next(state, action) {
      return {
        ...state,
        updateReservation: {
          ...state.updateReservation,
          requesting: false,
          reservation: action.payload,
          error: null,
        },
      };
    },
    throw(state, action) {
      return {
        ...state,
        updateReservation: {
          ...state.updateReservation,
          requesting: false,
          reservation: null,
          error: action.payload,
        },
      };
    }
  },
}, initialState);
