import React from "react";

const Loader = (props) => {
  const {
    index,
    className,
    width = "222px",
    height = "222px",
    childClass,
  } = props;
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

export default Loader;
