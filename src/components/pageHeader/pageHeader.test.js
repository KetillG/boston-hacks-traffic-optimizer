import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './pageHeader';

describe('<PageHeader />', () => {
  test('renders', () => {
    const wrapper = shallow(<PageHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
