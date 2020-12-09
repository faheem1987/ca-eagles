import React, { Fragment } from "react";
import HomeCarousel from "../home-carousel";
import Stats from "../stats";
import Videos from "../videos";

const Home = () => {
  return (
    <Fragment>
      <HomeCarousel />
      <div>
        <Videos />
        <Stats />
      </div>
    </Fragment>
  );
};

export default Home;
