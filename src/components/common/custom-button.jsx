import React from "react";
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

export default CustomButton;
