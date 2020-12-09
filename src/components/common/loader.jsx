import React from "react";
import PropTypes from "prop-types";

const Loader = (props) => {
  const { index, className, width, height, childClass } = props;
  const style = {
    width,
    height,
  };
  return (
    <div className={`loader ${className}`}>
      {[...Array(index)].map((e, i) => (
        <div key={i} style={style} className={childClass} />
      ))}
    </div>
  );
};

Loader.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  childClass: PropTypes.string,
};

export default Loader;
