import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className='input-group flex-hor-center'>
      {label ? <label>{label}</label> : null}
      <input onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
