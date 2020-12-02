import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  handleChange,
  label,
  error,
  className,
  onBlur,
  ...otherProps
}) => (
  <div className="form-input-custom">
    {error && <span className="input-error">{error}</span>}
    <input
      className={className}
      type="text"
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={label}
      {...otherProps}
    />
  </div>
);

FormInput.defaultProps = {
  onBlur: () => {},
};

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func,
  otherProps: PropTypes.object,
};

export default FormInput;
