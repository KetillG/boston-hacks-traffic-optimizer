/*global google*/
import React, { Component } from 'react';
import { Form, Text } from 'informed';
import ReactDOM from 'react-dom';
import AddressAutoComplete from './addressAutocomplete';
import InformTimePicker from './../informTimePicker';
import $ from 'jquery';

class AddressInput extends Component {
  constructor(props) {
    super(props);

    this.registerFormRef = React.createRef();

    // Remember!  This binding is necessary to make `this` work in the callback
    this.setFormApi = this.setFormApi.bind(this);
    this.onSubmitFailure = this.onSubmitFailure.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    autocomplete: false,
    errors: {},
    formSubmitted: false,
    formCheckboxes: [],
  };

  componentDidMount() {
    const googleScript = document.createElement('script');
    googleScript.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNBl9RA3jmY5dc3A7n4tksBXrMl4LjLFc&libraries=places';
    googleScript.async = true;

    document.body.appendChild(googleScript);

    googleScript.onload = function() {
      this.setState({
        autocomplete: true,
      });
    }.bind(this);
  }

  // initAutocomplete() {
  //   // Create the autocomplete object, restricting the search to geographical
  //   // location types.
  //   let tempAC;
  //   tempAC = new google.maps.places.Autocomplete(
  //     /** @type {!HTMLInputElement} */ (document.getElementById(this.props.id)),
  //     { types: ['geocode'] }
  //   );

  //   // When the user selects an address from the dropdown, populate the address
  //   // fields in the form.
  //   tempAC.addListener('place_changed', this.fillInAddress.bind(this));

  //   this.setState({
  //     autocomplete: tempAC,
  //   });
  // }

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
    console.log(data);
    //dispatch(signup({ data }));
  }

  // Form handling
  setFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    const { errors, autocomplete: ac } = this.state;
    console.log(ac);
    // Handles error
    let errorList = Object.entries(errors).map(e => <li key={e[0]}>{e[1]}</li>);

    if ($('#dtpdepart').datetimepicker) {
      console.log('aaa');
      $('#dtpdepart').datetimepicker({ format: 'LT' });
    }

    $(function() {
      console.log($('#dtpdepart'));
      // $('#datetimepicker3').datetimepicker({ format: 'LT' });
    });

    return (
      <div className="address-input content-contained">
        <div
          className="address-input__container"
          id="address-input"
          ref={this.registerFormRef}
        >
          <div className="address-input--text">
            <h3>Sign Up</h3>
          </div>
          <div className="row errors">
            <div className="col-xs-12 col-sm-2"> </div>
            <div className="col-xs-12 col-sm-10">
              {' '}
              <ul className="address-input__errors">{errorList}</ul>
            </div>
          </div>

          <Form
            className="form form-horizontal"
            getApi={this.setFormApi}
            onSubmitFailure={this.onSubmitFailure}
            onSubmit={this.onSubmit}
          >
            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="origin">
                Origin
              </label>
              <div className="col-sm-8">
                <AddressAutoComplete
                  field="origin"
                  id="origin"
                  className="form-control"
                  placeholder="Enter your address"
                  validateOnChange
                  validateOnBlur
                  ac={ac ? 'value' : null}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="destination">
                Destination
              </label>
              <div className="col-sm-8">
                <AddressAutoComplete
                  field="destination"
                  id="destination"
                  className="form-control"
                  placeholder="Enter your address"
                  validateOnChange
                  validateOnBlur
                  ac={ac ? 'value' : null}
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <div className="fieldset form-group">
              <label className="col-sm-2 control-label" htmlFor="depart">
                Time
              </label>
              <div className="col-sm-8">
                <InformTimePicker
                  field="depart"
                  id="depart"
                  className="form-control"
                  placeholder=""
                  validateOnChange
                  validateOnBlur
                />
              </div>
              <div className="col-sm-2"> </div>
            </div>

            <button type="submit" className="form__button btn btn-success">
              Update
            </button>
          </Form>
        </div>
      </div>
    );

    // return <AddressAutoComplete />;
  }
}

export default AddressInput;
