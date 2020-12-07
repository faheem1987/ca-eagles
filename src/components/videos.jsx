import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import ReactPlayer from "react-player/youtube";
import Loader from "./common/loader";

const Videos = (props) => {
  const { isLoading, videos } = props;
  const URL = (videos && videos[0].URL) || [];
  return (
    <section className="hp-videos content">
      <h2 className="float-left">Latest Videos</h2>
      <div className="float-right see-more" onClick={() => {}}>
        See more
      </div>
      <div className="videos-wrapper">
        {isLoading || isLoading === undefined ? (
          <Loader
            index={3}
            className="content"
            childClass="stats-loader"
            width="100%"
            height="300px"
          />
        ) : (
          <div className="videos">
            {URL.map((u, i) => (
              <ReactPlayer className="video" key={i} url={u} controls />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  videos: state.firestore.ordered.videos,
  isLoading: state.firestore.status.requesting.videos,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "videos",
    },
  ])
)(Videos);
