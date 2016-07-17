import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import authentication from './authentication/reducer';
import signupToken from './signupToken/reducer';
import component from './component/reducer';
import wizard from './wizard/reducer';
import device from './device/reducer';
import reservation from './reservation/reducer';
import user from './user/reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    authentication,
    signupToken,
    component,
    wizard,
    device,
    reservation,
    user,
    router,
    form,
    ...asyncReducers,
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer;
