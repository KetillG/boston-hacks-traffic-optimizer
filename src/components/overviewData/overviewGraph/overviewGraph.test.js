import React from 'react';
import { shallow } from 'enzyme';
import OverviewGraph from './overviewGraph';

describe('<OverviewGraph />', () => {
  test('renders', () => {
    const wrapper = shallow(<OverviewGraph />);
    expect(wrapper).toMatchSnapshot();
  });
});
