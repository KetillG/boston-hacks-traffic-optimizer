import React, { Component } from 'react';
import OverviewGraph from './overviewGraph';
import './overviewData.css';

class OverviewData extends Component {
  render() {
    const { data } = this.props;
    data.graph1 = [
      ['0700', 20],
      ['0710', 20],
      ['0720', 20],
      ['0730', 21],
      ['0740', 21],
      ['0750', 22],
      ['0800', 23],
      ['0810', 25],
      ['0820', 26],
      ['0830', 26],
      ['0840', 24],
      ['0850', 24],
      ['0900', 23],
      ['0910', 23],
      ['0920', 23],
      ['0930', 22],
      ['0940', 22],
      ['0950', 22],
      ['1000', 22],
    ];

    return (
      <div className="overview-data">
        <div className="overview-graphs">
          <OverviewGraph data={data.graph1} height="250" width="500" />
          <div>graph2</div>
        </div>
      </div>
    );
  }
}

export default OverviewData;
