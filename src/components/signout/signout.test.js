import React from 'react';
import { shallow } from 'enzyme';
import Signout from './signout';

describe('<Signout />', () => {
  test('renders', () => {
    const wrapper = shallow(<Signout />);
    expect(wrapper).toMatchSnapshot();
  });
});
