import React, { Component } from 'react';
import HomeCarousel from './home-carousel';
import Stats from './stats';
import Videos from './videos';
import VideoUpload from './video-upload';

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ca-eagles">
        <HomeCarousel />
        <section className="content">
          <Videos />
          <VideoUpload />
          <Stats />
        </section>
      </div>
    )
  }
}

export default Home;