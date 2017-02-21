import React from 'react';
import { bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Route from 'routes/Reservations/routes/NewReservation/Route';
import { shallow } from 'enzyme';

import configureStore from 'store/configureStore';

describe('(Route) NewReservation', () => {
  let _props, _spies, _wrapper, _component,
  
  before(() => {
    _component = (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  });

  beforeEach(() => {
    _spies = {};
  });

  it('should render without crashing', () => {
    _props = {};
    _wrapper = mount(_component);
  });
});
