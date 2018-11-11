import React from 'react';
import { shallow } from 'enzyme';
import AddressInput from './addressInput';

describe('<AddressInput />', () => {
  test('renders', () => {
    const wrapper = shallow(<AddressInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
