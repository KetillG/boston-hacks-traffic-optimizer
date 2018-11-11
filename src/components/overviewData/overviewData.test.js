import React from 'react';
import { shallow } from 'enzyme';
import OverviewData from './overviewData';

describe('<OverviewData />', () => {
  test('renders', () => {
    const wrapper = shallow(<OverviewData />);
    expect(wrapper).toMatchSnapshot();
  });
});
