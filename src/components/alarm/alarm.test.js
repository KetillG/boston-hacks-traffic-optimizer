import React from 'react';
import { shallow } from 'enzyme';
import Alarm from './alarm';

describe('<Alarm />', () => {
  test('renders', () => {
    const wrapper = shallow(<Alarm />);
    expect(wrapper).toMatchSnapshot();
  });
});
