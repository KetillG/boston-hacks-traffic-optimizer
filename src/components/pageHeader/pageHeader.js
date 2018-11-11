import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import './pageHeader.css';
import { receiveLogin, logout } from './../../actions/auth';

const baseurl = process.env.REACT_APP_SUB_URL;

class PageHeader extends Component {
  flipAuth = () => {
    const { dispatch, authenticated } = this.props;

    if (authenticated) {
      dispatch(logout());
    } else {
      dispatch(receiveLogin());
    }
  };

  authRouteButtons() {
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <Link type="button" className="btn btn-success" to={`${baseurl}/alarm`}>
          Alarm
        </Link>
      );
    } else {
      return null;
    }
  }

  authNavigationButtons() {
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.flipAuth}
          >
            Flip auth
          </button>
          <Link
            type="button"
            className="btn btn-danger"
            to={`${baseurl}/signout`}
          >
            Signout
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.flipAuth}
          >
            Flip auth
          </button>
          <Link
            type="button"
            className="btn btn-success"
            to={`${baseurl}/signup`}
          >
            Sign Up
          </Link>
          <Link type="button" className="btn btn-info" to={`${baseurl}/login`}>
            Login
          </Link>
        </React.Fragment>
      );
    }
  }

  render() {
    const authNavigationButtons = this.authNavigationButtons();
    const authRouteButtons = this.authRouteButtons();

    return (
      <div className="page-header row">
        <div className="col-xs-6 left">
          <Link type="button" className="btn btn-success" to={`${baseurl}/`}>
            Main page
          </Link>
          <Link
            type="button"
            className="btn btn-success"
            to={`${baseurl}/overview`}
          >
            Overview
          </Link>
          {authRouteButtons}
        </div>
        <div className="col-xs-6 button-menu right">
          {authNavigationButtons}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.isAuthenticated,
    use: state.auth.user,
  };
};

export default connect(mapStateToProps)(PageHeader);
