import React from 'react';
import { shallow } from 'enzyme';
import AddressAutocomplete from './addressAutocomplete';

describe('<AddressAutocomplete />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddressAutocomplete />);
    expect(wrapper).toMatchSnapshot();
  });
});
