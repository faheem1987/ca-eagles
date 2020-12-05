import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import ReactPlayer from "react-player/youtube";

const Videos = (props) => {
  const URL = (props.videos && props.videos[0].URL) || [];
  return (
    <section className="hp-videos content">
      <h2 className="float-left">Latest Videos</h2>
      <div className="float-right see-more" onClick={() => {}}>
        See more
      </div>
      <div className="videos-wrapper">
        {URL.map((u, i) => (
          <ReactPlayer className="video" key={i} url={u} controls />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  videos: state.firestore.ordered.videos,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "videos",
    },
  ])
)(Videos);
