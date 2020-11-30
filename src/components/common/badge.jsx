import React from "react";
import { Link } from "react-router-dom";

const Badge = ({ url, id, className, asLink }) => {
  const img = <img src={url} alt={id} />;

  return (
    <div className={`badge ${className}`}>
      {asLink ? <Link to={`/${id}`}>{img}</Link> : img}
    </div>
  );
};

export default Badge;
