import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverviewData from './../overviewData';
import AddressInput from './../addressInput';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.getUserData = this.getUserData.bind(this);
  }

  getUserData() {
    const { data } = this.props;
    if (true || !data) {
      return <AddressInput />;
    } else {
      return null;
    }
  }

  render() {
    const getUserData = this.getUserData();

    if (getUserData) return getUserData;

    return (
      <div className="overview">
        {getUserData}
        {/* <div className="overview__day-selector">today, tomorrow</div> */}
        <OverviewData data={this.props.data} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    data: state.data.data,
  };
};

export default connect(mapStateToProps)(Overview);
