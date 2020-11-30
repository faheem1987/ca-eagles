import React, { Fragment } from "react"

const FormInput = ({ handleChange, label, error, className, ...otherProps }) => (
  <div className="form-input-custom">
    {error && <span className="input-error">{error}</span>}
    <input
      className={className}
      type="text"
      onChange={handleChange}
      placeholder={label}
      {...otherProps}
    />
  </div>
)

export default FormInput
