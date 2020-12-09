import React from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

const AlertSection = (props) => {
  const { successMessage, error } = props;
  const v = successMessage ? "success" : "danger";
  return <Alert variant={v}>{successMessage || error}</Alert>;
};

AlertSection.propTypes = {
  successMessage: PropTypes.string,
  error: PropTypes.string,
};

export default AlertSection;
