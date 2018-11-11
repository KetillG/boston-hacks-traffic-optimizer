import React, { Component } from 'react';
import { Form, Text } from 'informed';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import validator from 'email-validator';
import { updateHistory } from './../../index';
import './login.css';
import { loginUser } from './../../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.registerFormRef = React.createRef();

    // Remember!  This binding is necessary to make `this` work in the callback
    this.setFormApi = this.setFormApi.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    errors: {},
    formSubmitted: false,
    formCheckboxes: [],
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   if (nextProps && nextProps.isAuthenticated) {
  //     updateHistory('/overview');
  //   }
  //   return true;
  // }

  validateEmail = value => {
    return null; //return !value || !validator.validate(value) ? 'Invalid email' : null;
  };

  validatePassword = value => {
    return !value || value.length <= 5
      ? 'Password must be atleast 7 characters'
      : null;
  };

  // Submission
  onSubmitFailure(errors) {
    // Scroll to errors
    const myDomNode = ReactDOM.findDOMNode(this.registerFormRef.current);
    myDomNode.scrollIntoView({ block: 'start', behavior: 'smooth' });

    this.setState({
      errors,
    });
  }

  onSubmit(data) {
    this.setState({
      formSubmitted: true,
      errors: {},
    });

    const { dispatch } = this.props;
    dispatch(loginUser(data.username, data.password));
  }

  // Form handling
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      setTimeout(() => {
        updateHistory('/overview');
      }, 100);
    }

    const { errors } = this.state;

    // Handles error
    let errorList = Object.entries(errors).map(e => <li key={e[0]}>{e[1]}</li>);

    return (
      <div className="login content-contained">
        <div className="login__container" id="login" ref={this.registerFormRef}>
          <div className="login--text">
            <h3>Login</h3>
          </div>
          <div className="row errors">
            <div className="col-xs-12 col-sm-2"> </div>
            <div className="col-xs-12 col-sm-10">
              {' '}
              <ul className="login__errors">{errorList}</ul>
            </div>
          </div>

          <Form
            className="form form-horizontal"
            getApi={this.setFormApi}
            onSubmitFailure={this.onSubmitFailure}
            onSubmit={this.onSubmit}
          >
            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="username">
                Username
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="username"
                  id="username"
                  // validate={this.validateEmail}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="password">
                Password
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="password"
                  id="password"
                  type="password"
                  validate={this.validatePassword}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>
            <button type="submit" className="form__button btn btn-success">
              Login
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Login);
