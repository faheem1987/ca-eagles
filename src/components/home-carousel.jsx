import React, { Fragment } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

const HomeCarousel = (props) => {
  return (
    <Fragment>
      {props.isLoading ? (
        <div className="image-loader"></div>
      ) : (
        <Slider autoplay={3000}>
          {(props.images || []).map(({ url }) => (
            <div
              key={url}
              style={{
                background: `url('${url}') no-repeat center center`,
                backgroundSize: "cover",
              }}
            ></div>
          ))}
        </Slider>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  images: state.firestore.ordered.carouselImages,
  isLoading: state.firestore.status.requesting.carouselImages,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "carouselImages",
    },
  ])
)(HomeCarousel);
