import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import PageHeader from './components/pageHeader';
import Footer from './components/footer';
import Home from './components/home';
import Signup from './components/signup';
import Signout from './components/signout';
import Login from './components/login';
import UserRoute from './components/userRoute';

import Overview from './routes/overview';

import './App.css';

const baseurl = process.env.REACT_APP_SUB_URL;

class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <main className="App">
        <Helmet defaultTitle="Reboot Hack" />
        <PageHeader />
        <section className="content">
          <Switch>
            <Route exact path={`${baseurl}/signup`} component={Signup} />
            <Route exact path={`${baseurl}/signout`} component={Signout} />
            <Route exact path={`${baseurl}/login`} component={Login} />
            <UserRoute
              exact
              path={`${baseurl}/overview`}
              isAuthenticated={isAuthenticated}
              component={Overview}
            />
            <Route exact path={`${baseurl}/`} component={Home} />
          </Switch>
        </section>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

export default withRouter(connect(mapStateToProps)(App));
