import React, { useState } from "react";
import PropTypes from "prop-types";
import PlayerUploader from "../uploaders/player-uploader";
import PlayersRankingForm from "../uploaders/player-rankings-form";
import VideoUpload from "../uploaders/video-upload";
import MatchResults from "../uploaders/match-results";

const AdminConsole = (props) => {
  const [index, setIndex] = useState(null);
  const showForm = (i) => {
    props.resetSuccessMessage();
    return index === i ? setIndex(null) : setIndex(i);
  };
  return (
    <div className="admin-console">
      <h2>Admin Console</h2>
      <div className="consoles">
        <div className="console">
          <div
            className="form-type"
            onClick={() => showForm(1)}
            aria-hidden="true"
          >
            Add player
          </div>
          {index === 1 && <PlayerUploader />}
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => showForm(2)}
            aria-hidden="true"
          >
            Update players ranking
          </div>
          {index === 2 && <PlayersRankingForm />}
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => showForm(3)}
            aria-hidden="true"
          >
            Match result
          </div>
          {index === 3 && <MatchResults />}
        </div>

        <div className="console">
          <div
            className="form-type"
            onClick={() => showForm(4)}
            aria-hidden="true"
          >
            Upload video
          </div>
          {index === 4 && <VideoUpload />}
        </div>
      </div>
    </div>
  );
};

AdminConsole.propTypes = {
  resetSuccessMessage: PropTypes.func,
};

export default AdminConsole;
