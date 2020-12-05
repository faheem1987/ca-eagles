import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Carousel from "react-bootstrap/Carousel";

const HomeCarousel = (props) => (
  <Carousel className="home-carousel">
    {(props.images || []).map(({ url }, i) => (
      <Carousel.Item key={i}>
        <img src={url} alt="First slide" />
      </Carousel.Item>
    ))}
  </Carousel>
);

const mapStateToProps = (state) => ({
  images: state.firestore.ordered.carouselImages,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "carouselImages",
    },
  ])
)(HomeCarousel);
