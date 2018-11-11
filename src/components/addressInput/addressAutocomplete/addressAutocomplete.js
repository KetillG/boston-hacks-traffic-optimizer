/*global google*/
import React, { Component } from 'react';
import { Form, BasicText, asField } from 'informed';

const AddressAutocomplete = asField(({ fieldState, ...props }) => (
  // <React.Fragment>
  //   <BasicText
  //     fieldState={fieldState}
  //     {...props}
  //     style={fieldState.error ? { border: 'solid 1px red' } : null}
  //   />
  //   {fieldState.error ? (
  //     <small style={{ color: 'red' }}>{fieldState.error}</small>
  //   ) : null}
  // </React.Fragment>
  <InnerAddressAutocomplete fieldState={fieldState} {...props} />
));

class InnerAddressAutocomplete extends Component {
  state = {
    autocomplete: null,
    componentForm: {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.ac && !this.state.autocomplete) {
      let tempAC;
      tempAC = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (document.getElementById(
          this.props.id
        )),
        { types: ['geocode'] }
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      tempAC.addListener('place_changed', this.fillInAddress.bind(this));

      this.setState({
        autocomplete: tempAC,
      });
    }
  }

  fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = this.state.autocomplete.getPlace();
    this.props.fieldApi.setValue(place.formatted_address);
    place.ownid = this.props.id;
    if (!this.props.locationChange) return;
    this.props.locationChange(place);
    return;
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          });
          this.state.autocomplete.setBounds(circle.getBounds());
        }.bind(this)
      );
    }
  }

  render() {
    const { fieldState } = this.props;
    return (
      <React.Fragment>
        <BasicText
          fieldState={fieldState}
          {...this.props}
          onFocus={this.geolocate.bind(this)}
          style={fieldState.error ? { border: 'solid 1px red' } : null}
        />
        {fieldState.error ? (
          <small style={{ color: 'red' }}>{fieldState.error}</small>
        ) : null}
      </React.Fragment>
    );
  }
}

export default AddressAutocomplete;
