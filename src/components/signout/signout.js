import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateHistory } from './../../index';
import { logout } from './../../actions/auth';

class Signout extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(logout());
    updateHistory('/');
  }

  render() {
    return <div>Signout</div>;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Signout);
