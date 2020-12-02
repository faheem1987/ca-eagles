import React, { Component, Fragment } from "react";
import HomeCarousel from "../home-carousel";
import Stats from "../stats";
import Videos from "../videos";

class Home extends Component {
  render() {
    return (
      <>
        <HomeCarousel />
        <div>
          <Videos />
          <Stats />
        </div>
      </>
    );
  }
}

export default Home;
