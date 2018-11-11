import React, { Component } from 'react';
import { Form, Text } from 'informed';
import ReactDOM from 'react-dom';
import validator from 'email-validator';
import { connect } from 'react-redux';
import './signup.css';
import { addingUser, addUser } from './../../actions/auth';
import { updateHistory } from './../../index';

class Signup extends Component {
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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addingUser());
  }

  // Validation
  validateName = value => {
    return !value || value.length <= 5
      ? 'Name must be atleast 5 characters'
      : null;
  };

  validateEmail = value => {
    return !value || !validator.validate(value) ? 'Invalid email' : null;
  };

  validatePassword = (value, values) => {
    const { password } = values;
    if (!password || !password[0] || password[0].length <= 7)
      return 'Password must be atleast 7 characters';
    return password[0] !== password[1] ? 'Passwords do not match' : null;
  };

  // Submission
  onSubmitFailure(errors) {
    if (errors.password.length > 1) errors.password.pop();
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
    dispatch(addUser(data.name, data.name, data.password[0]));
  }

  // Form handling
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const { errors } = this.state;

    // Handles error
    let errorList = Object.entries(errors).map(e => <li key={e[0]}>{e[1]}</li>);

    const { isFetching, added } = this.props;

    if (added) {
      updateHistory('/login');
    }

    const readOnly = isFetching ? 'readonly' : '';

    return (
      <div className="signup content-contained">
        <div
          className="signup__container"
          id="signup"
          ref={this.registerFormRef}
        >
          <div className="signup--text">
            <h3>Sign Up</h3>
          </div>
          <div className="row errors">
            <div className="col-xs-12 col-sm-2"> </div>
            <div className="col-xs-12 col-sm-10">
              {' '}
              <ul className="signup__errors">{errorList}</ul>
            </div>
          </div>

          <Form
            className="form form-horizontal"
            getApi={this.setFormApi}
            onSubmitFailure={this.onSubmitFailure}
            onSubmit={this.onSubmit}
          >
            <div className="fieldset form-group" disabled={true}>
              <label className="col-sm-2 control-label" htmlFor="name">
                Name
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="name"
                  id="name"
                  validate={this.validateName}
                  readOnly={readOnly}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>
            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="email">
                Email
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="email"
                  id="email"
                  readOnly={readOnly}
                  // validate={this.validateEmail}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="password-0">
                Password
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="password[0]"
                  id="password-0"
                  type="password"
                  validate={this.validatePassword}
                  readOnly={readOnly}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="password-1">
                Password Again
              </label>
              <div className="col-sm-8">
                <Text
                  className="form-control"
                  field="password[1]"
                  id="password-1"
                  type="password"
                  validate={this.validatePassword}
                  readOnly={readOnly}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <button type="submit" className="form__button btn btn-success">
              Sign Up
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.register.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    added: state.register.added,
  };
};

export default connect(mapStateToProps)(Signup);
