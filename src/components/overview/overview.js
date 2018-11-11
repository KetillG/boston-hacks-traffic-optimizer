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
    const { user } = this.props;
    if (!user || !user.data) {
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
        <div className="overview__day-selector">today, tomorrow</div>
        <OverviewData data={{}} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Overview);
