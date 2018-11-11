import React from 'react';
import { shallow } from 'enzyme';
import InformTimePicker from './informTimePicker';

describe('<InformTimePicker />', () => {
  test('renders', () => {
    const wrapper = shallow(<InformTimePicker />);
    expect(wrapper).toMatchSnapshot();
  });
});
