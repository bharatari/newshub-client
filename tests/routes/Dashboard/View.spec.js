import React from 'react';
import { bindActionCreators } from 'redux';
import View from 'routes/Dashboard/View';
import { shallow } from 'enzyme';

describe('(View) Dashboard', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
  });

  it('should render as a <div>.', () => {
    _props = {};
    _wrapper = shallow(<View {..._props} />);

    expect(_wrapper.is('div')).to.equal(true);
  });
});
