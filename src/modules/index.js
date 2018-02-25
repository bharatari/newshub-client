import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import authentication from './authentication/reducer';
import signupToken from './signupToken/reducer';
import roomReservation from './roomReservation/reducer';
import reservation from './reservation/reducer';
import device from './device/reducer';
import image from './image/reducer';
import room from './room/reducer';
import user from './user/reducer';
import role from './role/reducer';
import event from './event/reducer';
import log from './log/reducer';
import notifications from './notifications/reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    authentication,
    signupToken,
    device,
    roomReservation,
    reservation,
    user,
    router,
    form,
    image,
    room,
    role,
    event,
    log,
    notifications,
    ...asyncReducers,
  });
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;
