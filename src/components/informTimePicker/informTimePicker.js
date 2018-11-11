import React, { Component } from 'react';
import { BasicText, asField } from 'informed';

// const validate = value => {
//   return !value || value.length < 5
//     ? 'Field must be at least five characters'
//     : null;
// };

const InformTimePicker = asField(({ fieldState, ...props }) => (
  <React.Fragment>
    <div className="input-group date" id={`dtp${props.id}`}>
      <BasicText
        type="time"
        id={props.id}
        name={props.id}
        fieldState={fieldState}
        {...props}
      />
      <span className="input-group-addon">
        <span className="glyphicon glyphicon-time" />
      </span>
    </div>
    {fieldState.error ? (
      <small style={{ color: 'red' }}>{fieldState.error}</small>
    ) : null}
  </React.Fragment>
));

export default InformTimePicker;
