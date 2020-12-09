import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Badge from "../common/badge";
import Loader from "../common/loader";

const Players = (props) => {
  const { playerInfo, isLoading } = props;
  return (
    <div className="players-main content">
      {isLoading ? (
        <Loader index={5} className="players-loader" />
      ) : (
        (playerInfo || []).map(({ url, id }) => (
          <Badge url={url} id={id} key={id} asLink />
        ))
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerInfo: state.firestore.ordered.playerInfo,
  isLoading: state.firestore.status.requesting.playerInfo,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "playerInfo",
    },
  ])
)(Players);
