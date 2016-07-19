import { injectReducer } from '../../modules/';

export default (store) => ((nextState, cb) => {
  /*  Webpack - use 'require.ensure' to create a split point
      and embed an async module loader (jsonp) when bundling   */
  require.ensure([], (require) => {
    /*  Webpack - use require callback to define
        dependencies for bundling   */
    const Route = require('./Route').default
    const reducer = require('./modules/reducer').default

    /*  Add the reducer to the store on key 'counter'  */
    injectReducer(store, { key: 'dashboard', reducer })

    /*  Return getComponent   */
    cb(null, Route)

  /* Webpack named bundle   */
  }, 'dashboard');
});
