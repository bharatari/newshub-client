import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authentication from './authentication/reducer';
import component from './component/reducer';
import wizard from './wizard/reducer';
import device from './device/reducer';
import reservation from './reservation/reducer';
import user from './user/reducer';

export default combineReducers({
  router,
  authentication,
  component,
  device,
  reservation,
  user,  
  form,
});
