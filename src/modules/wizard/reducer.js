import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({
  SET_WIZARD_VALUE: (state, action) => ({
    ...state,
    [action.payload.name]: {
      ...state[action.payload.name],
      [action.payload.key]: action.payload.value
    },
  })
}, initialState);
