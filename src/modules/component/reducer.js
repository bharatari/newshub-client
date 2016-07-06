import { handleActions } from 'redux-actions';

const initialState = {
  modal: {
    show: false,
  },
};

export default handleActions({
  SHOW_MODAL: (state) => ({
    ...state,
    modal: {
      ...state.modal,
      show: true,
    },
  }),
  HIDE_MODAL: (state) => ({
    ...state,
    modal: {
      ...state.modal,
      show: false,
    },
  }),
}, initialState);
