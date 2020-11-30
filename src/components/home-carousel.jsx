import React from "react"
import Carousel from "react-bootstrap/Carousel"

const HomeCarousel = () => (
  <Carousel className="home-carousel">
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://picsum.photos/1000/600"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://picsum.photos/seed/picsum/1000/600"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://picsum.photos/id/237/1000/600"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>
)

export default HomeCarousel
