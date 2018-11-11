import React, { Component } from 'react';
import OverviewGraph from './overviewGraph';
import './overviewData.css';

class OverviewData extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="overview-data">
        <div className="overview-graphs">
          <OverviewGraph data={data.graph1} height="250" width="500" />
          {/* <div>graph2</div> */}
        </div>
      </div>
    );
  }
}

export default OverviewData;
