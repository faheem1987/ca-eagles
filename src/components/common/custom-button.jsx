import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

const CustomButton = ({ isLoading = false, text, type, className = "" }) => (
  <div className="custom-button-wrapper">
    <Button
      variant="primary"
      className={`custom-button ${className}`}
      type={type}
    >
      {isLoading ? (
        <div className="spinner-border text-white" role="status" />
      ) : (
        text
      )}
    </Button>
  </div>
);

CustomButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default CustomButton;
