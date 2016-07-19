import { injectReducer } from '../../modules/';
import Route from './Route';
import reducer from './modules/reducer';

export default (store) => ((nextState, cb) => {
  /*  Add the reducer to the store on key 'counter'  */
  injectReducer(store, { key: 'dashboard', reducer });

  /*  Return getComponent   */
  cb(null, Route);
});
