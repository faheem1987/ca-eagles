import React, { Component, Fragment } from 'react';
import HomeCarousel from './home-carousel';
import Stats from './stats';
import Videos from './videos';

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <HomeCarousel />
        <section className="content">
          <Videos />
          <Stats />
        </section>
      </Fragment>
    )
  }
}

export default Home;