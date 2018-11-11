import React from 'react';
import { shallow } from 'enzyme';
import Signup from './signup';

describe('<Signup />', () => {
  test('renders', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });
});
