import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Badge = ({ url, id, className, asLink }) => {
  const img = <img src={url} alt={id} />;

  return (
    <div className={`badge ${className}`}>
      {asLink ? <Link to={`/${id}`}>{img}</Link> : img}
    </div>
  );
};

Badge.propTypes = {
  url: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  asLink: PropTypes.bool,
};

export default Badge;
