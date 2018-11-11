import React, { Component } from 'react';

import { Form, Text } from 'informed';
import ReactDOM from 'react-dom';

import InformTimePicker from './../informTimePicker';

import { connect } from 'react-redux';
import './alarm.css';
import { registerForAlarm } from './../../actions/alarm';

class Alarm extends Component {
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

  validateNumber = value => {
    return !value || value !== parseInt(value) + '' ? 'Not a number' : null;
  };

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
    dispatch(registerForAlarm(data));
  }

  // Form handling
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const { errors } = this.state;
    const { isFetching, confirmed } = this.props;

    // Handles error
    let errorList = Object.entries(errors).map(e => <li key={e[0]}>{e[1]}</li>);

    if (isFetching) {
      return <div> Registering </div>;
    }

    if (confirmed) {
      return <div>Thanks for registering</div>;
    }

    return (
      <div className="alarm content-contained">
        <h1>Register for dynamic alarm clock</h1>
        <p>
          We use estimated travel time in traffic for each day and the time it
          takes for you to wake up and leave the house to compute the optimal
          alarm time. The optimal alarm time is the time where you wake up, get
          ready for the day, drive to work and arrive exactly on time. Then we
          will give you a call at the optimal time. So with the dynamic alarm
          you can now maximize your sleep each night.
        </p>
        <h3>Register for the dynamic alarm bellow</h3>
        <div className="alarm-form">
          <div
            className="alarm-form__container"
            id="alarm-form"
            ref={this.registerFormRef}
          >
            <div className="row errors">
              <div className="col-xs-12 col-sm-2"> </div>
              <div className="col-xs-12 col-sm-10">
                {' '}
                <ul className="alarm-form__errors">{errorList}</ul>
              </div>
            </div>

            <Form
              className="form form-horizontal"
              getApi={this.setFormApi}
              onSubmitFailure={this.onSubmitFailure}
              onSubmit={this.onSubmit}
            >
              <div className="fieldset form-group">
                <div className="col-sm-2"> </div>
                <label
                  className="col-sm-10 control-label pll"
                  htmlFor="readyTime"
                >
                  How long does it take you from waking up to leaving the house
                  in the morning?
                </label>
                <div className="col-sm-2"> </div>
                <div className="col-sm-8">
                  <Text
                    className="form-control"
                    field="readyTime"
                    id="readyTime"
                    validate={this.validateNumber}
                  />
                </div>
                <div className="col-sm-2"> </div>
              </div>

              <div className="fieldset form-group">
                <div className="col-sm-2"> </div>
                <label className="col-sm-10 control-label pll" htmlFor="phone">
                  What is your phone number?
                </label>
                <div className="col-sm-2"> </div>
                <div className="col-sm-8">
                  <Text
                    className="form-control"
                    field="phone"
                    id="phone"
                    validate={this.validateNumber}
                  />
                </div>
                <div className="col-sm-2"> </div>
              </div>

              <div className="fieldset form-group">
                <div className="col-sm-2"> </div>
                <label className="col-sm-10 control-label pll" htmlFor="phone">
                  When do you want to arrive to work?
                </label>
                <div className="col-sm-2"> </div>
                <div className="col-sm-8">
                  <InformTimePicker
                    field="leave"
                    id="leave"
                    className="form-control"
                    placeholder=""
                    validateOnChange
                    validateOnBlur
                  />
                </div>
                <div className="col-sm-2"> </div>
              </div>

              <button type="submit" className="form__button btn btn-success">
                Register
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.alarm.isFetching,
    confirmed: state.alarm.confirmed,
  };
};

export default connect(mapStateToProps)(Alarm);
