import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertSection = (props) => {
  const { successMessage, error } = props;
  const v = successMessage ? "success" : "danger";
  return <Alert variant={v}>{successMessage || error}</Alert>;
};

export default AlertSection;
