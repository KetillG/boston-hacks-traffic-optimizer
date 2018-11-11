import React from 'react';
import { shallow } from 'enzyme';
import Overview from './overview';

describe('<Overview />', () => {
  test('renders', () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper).toMatchSnapshot();
  });
});
